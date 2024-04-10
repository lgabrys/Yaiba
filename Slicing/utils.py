import csv
import os
import shlex
import shutil
import subprocess

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

def find_line(function, file, isfile, path):
    # print('Find line for:', function, file, isfile, path)
    if isfile:
        path = '/'.join(path.split('/')[:-1])
    files = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]
    for file in files:
        with open(os.path.join(path, file)) as imported_file:
            # print("File analyzed: ", file)
            lines = [line.rstrip() for line in imported_file]
            for i in range(len(lines)):
                # print('Line', i, '/', len(lines), ': looking for', function, 'in', lines[i])
                line_split = (lines[i].replace('(', ' (')).strip(';').split(' ')
                # print(line_split)
                if function == '_':
                    if line_split.count('export') > 0 and line_split.count('default') > 0:
                        return i + 1, lines[i], os.path.join(path, file), file
                else:
                    if line_split.count('export') > 0 and line_split.count(function) > 0:
                        # print(i+1, lines[i], os.path.join(path, file), file)
                        return i + 1, lines[i], os.path.join(path, file), file
    return 0, '', '', ''

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
        if statement.split().contains('import') or statement.split().contains('require'):
            return True
    return False