/**
 * data storage module
 */

/*
//prject item
class projectItem
    String id
    Object project

prject model
class project{
    String id
    String name
    String src
    Object files
    Object config
}

file item
class files{
    String id
    Object file
}
file model
class file{
    String id
    String pid
    String extension
    String type
    String name
    String src
    String output
    Boolean compile
    Array  imports
    Object settings{
        String outputStyle [nested] //outputstyle
    }
}
*/


































var fs          = require('fs'),
    path        = require('path'),
    util        = require('./util'),
    FileManager = global.getFileManager(),
    projectsDb  = {};    //projects datatable object
/**
 * projectDb initializition
 */


function projectDbinitialize() {
    if (!fs.existsSync(FileManager.projectsFile)) {
        fs.appendFile(FileManager.projectsFile, '{}');
    } else {
        projectsDb = util.readJsonSync(FileManager.projectsFile);
    }
}
