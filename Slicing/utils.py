import csv
import os
import shlex
import shutil
import subprocess

special_chars = [';', '{', '}', '(', ')']
def get_path_from_url(project_path, project_name, commit_hash, url, new):
    split = url.split('/')
    path = project_path + "/{}/{}/{}/{}".format(project_name, commit_hash, new, '/'.join(split[7:]))
    return path

def move_to_ExperienceRoom(file, project_path, statements):
    relative_path = project_path + '/ExperienceRoom/'
    # buggy_file_name = file.get('filename')[:-3] + '_buggy.js'
    # # print(buggy_file_name)
    # fixed_file_name = file.get('filename')[:-3] + '_fixed.js'
    # shutil.copy(file.get('buggy_file_path'), relative_path)
    # # shutil.move(relative_path + file.get('filename'), relative_path + buggy_file_name)
    # added = 0
    # with open(relative_path + buggy_file_name, 'w') as buggy_file:
    #     with open(relative_path + file.get('filename'), 'r') as old_file:
    #         for statement in statements:
    #             print(statement)
    #             added += len(statement)
    #             for line in statement:
    #                 buggy_file.write(line)
    #         for line in old_file.readlines():
    #             buggy_file.write(line)
    # os.remove(relative_path + file.get('filename'))
    # shutil.copy(file.get('fixed_file_path'), relative_path)
    # shutil.move(relative_path + file.get('filename'), relative_path + fixed_file_name)

def create_new_und_database(files_path, database_location):
    command = "und create -languages Web add {} analyze -all {}/exp.und".format(files_path, database_location)
    subprocess.run(shlex.split(command))

def create_und_databases(project_path):
    i = 0
    for projects in os.listdir(project_path):
        print('{}/{}: {}'.format(i, len(os.listdir(project_path)), os.listdir(project_path)[i]))
        with open('UNDCommands/undcommands{}.txt'.format(projects), 'w+') as f:
            for commits in os.listdir(os.path.join(project_path, projects)):
                for version in os.listdir(os.path.join(project_path, projects, commits)):
                    path = os.path.join(project_path, projects, commits, version)
                    f.write('create -languages Web {}/exp.und \nadd {} \nanalyze -all\n'.format(path, path))
        f.close()
        # command = "und -quiet UNDCommands/undcommands{}.txt".format(projects)
        # subprocess.run(shlex.split(command))
        i += 1
    print('{}/{}'.format(i, i))

def find_line(path, function):
    try:
        with open(path) as imported_file:
            lines = [line.rstrip() for line in imported_file]
            for i in range(len(lines)):
                line_split = (lines[i].replace('(', ' (')).strip(';').split(' ')
                if function == '_':
                    if line_split.count('export') > 0 and line_split.count('default') > 0:
                        return i + 1, lines[i]
                else:
                    if line_split.count('export') > 0 and line_split.count(function) > 0:
                        return i + 1, lines[i]
    except FileNotFoundError:
        print('File not found: {} at {}'.format(function, path))
        return -1, ''
def get_files(project_path):
    files = []
    path_split = project_path.split('/')
    path_split = path_split[0:-1]
    csv_path = '/'.join(path_split)
    csv_file_path = csv_path + '/commits.csv'

    with open(csv_file_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')

        for row in csv_reader:
            if row[0] != 'Project name':
                files.append({
                    'project_name': row[0],
                    'repoUrl': row[1],
                    'commit_hash': row[3],
                    'filename': row[6],
                    'buggy_file_path': get_path_from_url(project_path, row[0], row[3], row[7], 'old'),
                    'fixed_file_path': get_path_from_url(project_path, row[0], row[3], row[8], 'new'),
                    'buggy_line_num': int(row[10]),
                    'buggy_line': row[11],
                    'fixed_line': row[12]
                })
    return files

def check_imports(statements):
    for statement in statements:
        if 'import' in statement or 'require' in statement:
            return True
    return False

def get_imports(statements):
    # print(statements)
    functions = []
    files = []
    file = ' '.join([s.strip() for s in statements]).split(' ')
    i = 0
    while i < len(file):
        # print(file[i])
        if 'import' in file[i]:  # or 'require' in file[i]:
            i += 1
            function = []
            while i < len(file) and file[i] != 'from':
                function.append(file[i].strip('{').strip('}'))
                i += 1
            i += 1
            functions.append(function)
            files.append(file[i].strip(';').strip("'"))
        i += 1
    print(functions, files)
    print(len(functions), len(files))
    return functions, files

def create_file(project_name, repo_url, commit_hash, filename, buggy_file_path, fixed_file_path, buggy_line_num,
                buggy_line, fixed_line):
    file = {
        'project_name': project_name,
        'repoUrl': repo_url,
        'commit_hash': commit_hash,
        'filename': filename,
        'buggy_file_path': buggy_file_path,
        'fixed_file_path': fixed_file_path,
        'buggy_line_num': buggy_line_num,
        'buggy_line': buggy_line,
        'fixed_line': fixed_line
    }
    return file

def get_new_path(old_path, filename):
    new_path = os.path.split(old_path)[0]
    # print(new_path)
    split = filename.split('/')
    # print(split)
    i = 0
    if split[i] != '..' or split[i] != '.':
        print('Error source : {}'.format(filename))
    while split[i] == '..':
        new_path = os.path.split(new_path)[0]
        # print(new_path)
        i += 1
    while i < len(split) - 1:
        new_path = os.path.join(new_path, split[i])
        i += 1
    new_path = os.path.join(new_path, split[i] + '.js')
    return new_path

def check_duplicate(temp_statements, current_lines, statement, lines):
    i = 0
    y = 0
    statements = []
    final_lines = []
    while i < len(current_lines) or y < len(lines):
        if y == len(lines) or i < len(current_lines) and current_lines[i] < lines[y]:
            statements.append(temp_statements[i])
            final_lines.append(current_lines[i])
            i += 1
        elif i == len(current_lines) or y < len(lines) and current_lines[i] > lines[y]:
            statements.append(statement[y])
            final_lines.append(lines[y])
            y += 1
        else:
            statements.append(temp_statements[i])
            final_lines.append(current_lines[i])
            i += 1
            y += 1
    return statements, final_lines

# print(check_duplicate(['Bonjour', 'Luc', 'et'], [1, 3, 5], ['je m\'appelle', 'Luc', 'Gabrys', 'je', 'suis', 'à Keio'],
#                       [2, 3, 4, 6, 7, 9]))
# print(get_new_path(
#     '/home/eatoss/Documents/GitHub/Yaiba/DataMining/unsliced_repositories/Facebook-Messenger-Desktop/9dd830f0495be3c32422a401e800e5ad9fe2b4c6/old/src/scripts/browser/application.js',
#     '../renderer/app'))
# with open(
#         '/home/eatoss/Documents/GitHub/Yaiba/DataMining/unsliced_repositories/Facebook-Messenger-Desktop/9dd830f0495be3c32422a401e800e5ad9fe2b4c6/old/src/scripts/browser/application.js') as f:
#     get_imports(f.readlines())
