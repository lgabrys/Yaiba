import shlex
import shutil
import subprocess
import time

import understand
import traceback
import csv
import json
import sys
import os
from difflib import get_close_matches, ndiff
import concurrent.futures
from backward_slicing import BackwardSlicing
from utils import *

csv.field_size_limit(sys.maxsize)

def slice_file(file, project_path, statements=None, dual=False):
    version = 'new' if dual else 'old'
    relative_path = str(os.path.join(project_path, file.get('project_name'), file.get('commit_hash'), version))
    db_path = str(os.path.join(relative_path, 'exp.und'))
    file_path = file.get('buggy_file_path')[len(relative_path) + 1:]
    if statements is None:
        statements = []
    db = understand.open(db_path)
    folderpath_db_map = {db_path: relative_path}
    if os.path.exists(os.path.join(folderpath_db_map[db_path], file_path)):
        print('Processing buggy file -----', file.get('filename'), int(file.get('buggy_line_num')))
        try:
            db_file = db.lookup(file_path, 'File')
            if db_file:
                slicing = BackwardSlicing(db, db_file[0], int(int(file.get('buggy_line_num'))))
                print('Doing backward slice on fixed file {} at {}......'.format(file.get('filename'),
                                                                                 file.get('buggy_file_path')))
                try:
                    statements, lines = slicing.run(root_path=relative_path, js_file_type='fixed_file')
                    db.close()
                    return statements, lines
                except Exception as err:
                    db.close()
                    print('Error in file', file.get('filename'), err)
                    traceback.print_exc()
            else:
                print('db_file not found: ' + file.get('filename'))
                db.close()
                return 'No lines', []
                # raise FileNotFoundError
        except SystemError as err:
            db.close()
            print(err)
            return ''
    else:
        db.close()
        raise FileNotFoundError
def slice_project(project_path, file, depth):
    # print(depth)
    if depth == 1:
        return slice_file(file, project_path)
    imports = []
    split_path = file.get('buggy_file_path').split('/')[8:]
    # file_path = '/'.join(split_path)
    full_path = project_path + '/' + '/'.join(split_path[:-1])
    # print(full_path)
    try:
        # with open(project_path + "/{}/{}/old/{}".format(file.get('project_name'), file.get('commit_hash'),
        #                                                 file_path)) as f:
        with open(file.get('buggy_file_path')) as f:
            importation = 0
            origin = 0
            functions = []
            for line in f.read().split('\n'):
                split = line.split(' ')
                # if importation == 1:
                #     i = 0
                #     while split[i] != 'from' and i < len(split):
                #         functions.append(split[i].removeprefix("{").removesuffix("}"))
                #         i += 1
                # el
                if split.count('import') > 0 or split.count('require') > 0:  # TODO Verify condition
                    if split[0] == 'import':
                        # print(' '.join(split))
                        i = 1
                        functions = []
                        while split[i] != 'from' and i < len(split):
                            functions.append(split[i].removeprefix("{").removesuffix("}"))
                            i += 1
                        if i == len(split):
                            importation = 1
                        elif split[i] == 'from':
                            target = split[i + 1].removeprefix("'").removesuffix("';")
                            target_split = target.split('/')
                            if len(target_split) == 1:
                                # print("Target_split: ", target_split)
                                for function in functions:
                                    imports.append(
                                        (function, target_split[0],
                                         not os.path.isdir('{}/{}'.format(full_path, target_split[0])),
                                         '{}/{}'.format(full_path, target_split[0])))
                                functions = []
                            else:
                                i = 0
                                # print(' '.join(split))
                                path = full_path
                                if target_split[0] == '.':
                                    for function in functions:
                                        imports.append((function, target_split[1] + '.js',
                                                        not os.path.isdir(path + '/' + target_split[1] + '.js'),
                                                        path + '/' + target_split[1] + '.js'))
                                else:
                                    while target_split[i] == '..':
                                        path = os.path.split(path)[0]
                                        # print(path)
                                        i += 1
                                    for function in functions:
                                        imports.append((function, target_split[-1], not os.path.isdir(path), path))
                                    functions = []
                    else:
                        print(split)
                    # imports.append(split[1])  # List of imports TODO慶應義塾大学院
        statements = []
        for imported in imports:
            # print("Imports !")
            num, line, file_path, filename = find_line(imported[0], imported[1], imported[2], imported[3])
            # print("Got line")
            if num != 0:
                new_file = {
                    'project_name': file.get('project_name'),
                    'repoUrl': file.get('repo_url'),
                    'commit_hash': file.get('commit_hash'),
                    'filename': filename,
                    'buggy_file_path': file_path,
                    'buggy_line_num': num,
                    'buggy_line': line,
                }
                # print('File created', new_file)
                statement = slice_project(project_path, new_file, depth - 1)
                # print('Got statement')
                statements.append(statement)
        # print('slice_file')
        # statements.append(['// Hello World\n'])
        return slice_file(file, project_path, statements=statements)
    except Exception as err:
        print(err)
def topdown(project_path):
    files = get_files(project_path)
    files = files[87:88]
    i = 1
    for file in files:
        # print("_____________________________________________________________\n\n\n{}/{}/{}, "
        # "{}\n\n\n_____________________________________________________________".format(file.get(
        # 'project_name'), file.get('commit_hash'), file.get('filename'), file.get('buggy_line_num')))
        print('{}/{}'.format(i, len(files)))
        slice = slice_project(project_path, file, 1)
        # print("I'm okay !")
        sliced_path = os.path.join(os.path.split(project_path)[0], 'sliced_repositories2')
        with open(sliced_path + '/' + file.get('project_name') + file.get('commit_hash') + 'line' + str(file.get(
                'buggy_line_num')) + file.get('filename'), 'w') as sliced_file:
            if slice == 'No lines':
                sliced_file.write(slice + '\n')
            elif slice != None and slice != []:
                for line in slice:
                    sliced_file.write(line + '\n')
            else:
                print(slice)
                raise EOFError
        i += 1
        time.sleep(2)
        # print("I'm okay !")

def test_backward_slice():
    db = understand.open('./test-slice-js/test-slice-js.und')
    with open('./test-slice-js/file_line_map.json') as f:
        file_line_map = json.load(f)
        for item in file_line_map:
            file = db.lookup(item['file'])[0]
            bs = BackwardSlicing(db, file, item['line_num'])
            actual_statements = bs.run()
            actual_statements = ''.join([s.strip() for s in actual_statements])

            if item['expected_output']:
                assert actual_statements == item['expected_output'], (
                    'Failed assertion in {} {}\n actual statement: {}\n expected output : {}'
                ).format(item['file'], item['line_num'], actual_statements, item['expected_output'])
                print('TEST PASSED for file/line', item['file'], item['line_num'])
            else:
                print('ACTUAL --- ', actual_statements)

def bottom_up_slicing(project_path, dual=False, depth=99999):
    # faulty = [8, 10, 12, 15, 17, 33, 47, 64, 69, 70, 72, 74, 76, 78, 79, 86, 88, 89, 91, 96, 122, 125, 127, 128, 129, 132, 134, 136, 142, 143, 152, 172, 173, 179, 195, 197, 206, 207, 209, 211, 227, 232, 236, 256, 257, 260, 266, 270, 272, 273, 274, 275, 282, 291, 294, 296, 299, 300, 302, 305, 306, 307, 315, 323, 329, 330, 337, 340, 344, 409, 414, 416, 419, 421, 422, 424, 425, 426, 427, 428, 429, 430, 431, 432, 436, 438, 442, 443, 447, 451, 452, 453, 458, 492, 496, 498, 499, 500, 507, 522, 526, 529, 530, 543, 545, 546, 579, 580, 581, 582, 583, 592, 593, 594, 595, 596, 597, 603, 608, 611, 614, 615, 616, 622, 623, 624, 625, 630, 637, 641, 642, 655, 664, 666, 667, 668, 672, 675, 687, 688, 691, 699, 700, 706, 713, 714, 715, 716, 717, 726, 729, 737, 740, 741, 747, 757, 758, 759, 762, 766, 784, 786, 790, 808, 810, 821, 833, 839, 847, 855]
    files = get_files(project_path)
    fileNum = 0
    # files_2 = []
    # for i in faulty:
    #     files_2.append(files[i])
    # files = files_2[0:10]
    # files = files[2:20]
    for file in files:
        print(fileNum)
        version = 'new' if dual else 'old'
        errors = 0
        sliced_num = 0
        d = 1
        statement, _ = slice_file(file, project_path)
        # print(statement)
        sliced_num += 1
        if statement == 'No lines':
            statement = ['No lines']
            errors += 1
        statements = [[statement]]
        # print(statements)
        while d < depth and d <= len(statements):
            # print(statements)
            for statement in statements[d - 1]:
                # print(statement)
                if check_imports(statement):
                    # print(statement)
                    functions, files = get_imports(statement)
                    # print(functions, files)
                    for i in range(len(functions)):
                        # print(i, functions[i])
                        funcs = functions[i]
                        # print(funcs)
                        path = get_new_path(file.get('buggy_file_path'), files[i])
                        # print(path)
                        # print(path, file.get('buggy_file_path'), files[i], funcs)
                        fixed_path = get_new_path(file.get('fixed_file_path'), files[i])
                        temp_statements = []
                        current_lines = []
                        for func in funcs:
                            # print(path, func)
                            num, content = find_line(path, func)
                            # print(num, content)
                            if num != -1:
                                sliced, lines = slice_file(
                                    create_file(file.get('project_name'), file.get('repo_url'), file.get('commit_hash'),
                                                os.path.split(path)[1], path, fixed_path, num, content, content),
                                    project_path)
                                if sliced == 'No lines':
                                    errors += 1
                                sliced_num += 1
                                if len(funcs) > 1 and func != funcs[0]:
                                    temp_statements, current_lines = check_duplicate(temp_statements, current_lines,
                                                                                     sliced,
                                                                                     lines)
                                else:
                                    temp_statements = sliced
                                    # print(temp_statements)
                                    current_lines = lines
                        # print(statements, temp_statements)
                        if len(statements) <= d:
                            statements.append([])
                        # print(temp_statements)
                        if temp_statements != []:
                            statements[d].append(temp_statements)
                        # print('append')
            # print('added to d')
            d += 1
            # print(os.path.join(os.path.split(project_path)[0], 'sliced_repositories_bottom_up/bottomup_stats2.csv'))
        # print(statements)
        with open(os.path.join(os.path.split(project_path)[0], 'sliced_repositories_bottom_up/bottomup_stats2.csv'),
                  'a+') as f:
            f.write("{}, {}, {}\n".format(d - 2, sliced_num, errors))
            f.close()
        filename = file.get('project_name') + '_' + file.get('commit_hash') + '_' + 'line' + str(
            file.get('buggy_line_num')) + '_' + file.get('filename')[:-3] + '_' + version + '.js'
        # print(filename)
        with open(os.path.join(os.path.split(project_path)[0], 'sliced_repositories_bottom_up') + '/' + filename,
                  'w') as f:
            for i in range(len(statements)):
                epoch = statements[len(statements) - 1 - i]
                for statement in epoch:
                    for line in statement:
                        f.write(line + '\n')
            f.close()
        fileNum += 1

if __name__ == '__main__':
    project_type = sys.argv[1]  # choices = ['single', 'dual', 'test']
    dual_slice = False if sys.argv[2] == 'False' else True
    project_path = sys.argv[3:]
    if project_type == 'bottomup':
        if os.path.exists(os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories_bottom_up')):
            shutil.rmtree(os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories_bottom_up'))
        os.mkdir(os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories_bottom_up'))
        if os.path.exists(
                os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories_bottom_up/bottomup_stats2.csv')):
            shutil.rmtree(
                os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories_bottom_up/bottomup_stats2.csv'))
        # os.mkdir(os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories_bottom_up/bottomup_stats2.csv'))
        # with open(os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories_bottom_up/bottomup_stats2.csv'), 'w') as f:
        #     f.close()
        bottom_up_slicing(project_path[0])

    elif project_type == 'topdown':
        # if os.path.exists(project_path[0] + '/ExperienceRoom'):
        #     shutil.rmtree(project_path[0] + '/ExperienceRoom')
        #     print(os.path.split(project_path[0]))
        if os.path.exists(os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories2')):
            shutil.rmtree(os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories2'))
        # os.mkdir(project_path[0] + '/ExperienceRoom')
        os.mkdir(os.path.join(os.path.split(project_path[0])[0], 'sliced_repositories2'))
        topdown(project_path[0])
        # shutil.rmtree(project_path[0] + '/ExperienceRoom')
    # elif project_type == 'dual':
    #     process_single_file(project_path[0])
    elif project_type == 'merge':
        pass  # TODO
    elif project_type == 'createdb':
        create_und_databases(project_path[0])
    elif project_type == 'test':
        test_backward_slice()
    else:
        print()
