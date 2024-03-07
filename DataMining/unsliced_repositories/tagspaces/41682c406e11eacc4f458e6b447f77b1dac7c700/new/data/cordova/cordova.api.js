/* Copyright (c) 2012-2015 The TagSpaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that
 * can be found in the LICENSE file. */
/* global define */

define(function(require, exports, module) {
  "use strict";

  console.log("Loading ioapi.cordova.js..");

  var TSCORE = require("tscore");
  var TSPOSTIO = require("tspostioapi");
  var attachFastClick = require('cordova/fastclick/fastclick.min');
  var fsRoot;
  var urlFromIntent;
  var widgetAction;
  var loadedSettings, loadedSettingsTags;
  var appSettingFile = "settings.json";
  var appSettingTagsFile = "settingsTags.json";

  document.addEventListener("deviceready", onDeviceReady, false);
  document.addEventListener("resume", onDeviceResume, false);
  document.addEventListener("initApp", onApplicationLoad, false);
  // Register ios file open handler
  handleOpenURL = function(url) {
    var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
    TSCORE.showConfirmDialog("File copied", "File " + fileName + " is copied in inbox folder. Would you like to open it ?", function() {
      TSCORE.FileOpener.openFile(url);
    });
  };

  // Cordova loaded and can be used
  function onDeviceReady() {
    console.log("Device Ready:"); // "+device.platform+" - "+device.version);
    // Redifining the back button
    document.addEventListener("backbutton", function(e) {
      TSCORE.FileOpener.closeFile();
      $('.modal').modal('hide');
      e.preventDefault();
    }, false);

    // iOS specific initialization
    if (isCordovaiOS) {
      window.plugins = window.plugins || {};
      // TODO: use fileOpener2 plugin on all platforms
      // https://build.phonegap.com/plugins/1117
      window.plugins.fileOpener = cordova.plugins.fileOpener2;
    }

    if (window.plugins.webintent) {
      window.plugins.webintent.getUri(
        function(url) {
          if ("createTXTFile" === url || url.indexOf("TagSpaces") > 0) {
            widgetAction = url;
          } else {
            urlFromIntent = url; 
          }
        }
        //, function(error) {
        //  TSCORE.showAlertDialog("WebIntent Error: " + error);
        //}
      );
      window.plugins.webintent.onNewIntent(function(url) {
        widgetAction = url;
        widgetActionHandler();
      });
    }

    attachFastClick(document.body);
    getFileSystem();

    if (isCordovaiOS) {
      setTimeout(function() {
        navigator.splashscreen.hide();
      }, 1000);

      //Enable TestFairy if available
      if (PRODUCTION != "true" && TestFairy) {
        TestFairy.begin("ef5d3fd8bfa17164b8068e71ccb32e1beea25f2f");
      }
    }
  }

  function onDeviceResume() {
    //TODO: reload curtent dir after background operation
    TSCORE.IO.listDirectory(TSCORE.currentPath);
  }

  function widgetActionHandler() {

    if (TSCORE.currentPath === null) {
      TSCORE.showAlertDialog("Please set location folder to use widget");  
      return;
    }

    if (widgetAction === "createTXTFile") {
      TSCORE.createTXTFile();
    } else {
      var fileName = widgetAction.substring(widgetAction.lastIndexOf('/'), widgetAction.length);
      var newFileName = TSCORE.currentPath + fileName;
      var newFileFullPath = fsRoot.nativeURL + "/" + newFileName;
      renameFile(widgetAction, newFileName);
      TSCORE.FileOpener.openFile(newFileFullPath);
    }

    widgetAction = undefined;
  }

  function onApplicationLoad() {
    if (widgetAction) {
      widgetActionHandler();
    }
  }

  var handleStartParameters = function() {
    if (urlFromIntent !== undefined && urlFromIntent.length > 0) {
      console.log("Intent URL: " + urlFromIntent);
      var filePath = decodeURIComponent(urlFromIntent);
      TSCORE.FileOpener.openFileOnStartup(filePath);
    }
  };

  function getAppStorageFileSystem(fileName, fileCallback, fail) {
        
    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, //dataDirectory,
      function(fs) {
        fs.getFile(fileName, {create:true}, fileCallback, fail);
      }, 
      function(error) {
        console.log("getSettingsFileSystem error: " + JSON.stringify(error));
      }
    );
  }

  function saveSettingsFile(fileName, data) {

    getAppStorageFileSystem(fileName,
      function(fileEntry) {
        fileEntry.createWriter(
          function(writer) {
            writer.write(data);
          }, function(error) { 
            console.log("Error " + JSON.stringify(error));
          }
        );
      },
      function(error) {
        console.log("Error " + JSON.stringify(error));
      }
    );
  }

  function loadSettingsFile(fileName, ready) {

    getAppStorageFileSystem(fileName,
      function(fileEntry) {
        fileEntry.file(
          function(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
              var content = null;
              if (evt.target.result.length > 0) {
                content = evt.target.result;
              }
              ready(content);
            };
            reader.readAsText(file);
          }, 
          function(error) {
            console.log("Error " + JSON.stringify(error));
          }
        );
      },
      function(error) {
        console.log("Error " + JSON.stringify(error));
      }
    );
  }

  function saveSettings(settings) {
    saveSettingsFile(appSettingFile, settings);
  }
  
  function loadSettings() {
    return loadedSettings;
  }

  function saveSettingsTags(tagGroups) {
    var jsonFormat = '{ "appName": "' + TSCORE.Config.DefaultSettings.appName +
        '", "appVersion": "' + TSCORE.Config.DefaultSettings.appVersion +
        '", "appBuild": "' + TSCORE.Config.DefaultSettings.appBuild +
        '", "settingsVersion": ' + TSCORE.Config.DefaultSettings.settingsVersion +
        ', "tagGroups": ' + tagGroups + ' }';
    saveSettingsFile(appSettingTagsFile, jsonFormat);
  }
  
  function loadSettingsTags() {
    return loadedSettingsTags;
  }

  function getFileSystem() {
    //on android cordova.file.externalRootDirectory points to sdcard0
    var fsURL = (isCordovaiOS === true) ? cordova.file.documentsDirectory : "file:///";
    window.resolveLocalFileSystemURL(fsURL, 
      function(fileSystem) {
        fsRoot = fileSystem;
        console.log("Filesystem Details: " + JSON.stringify(fsRoot));
        handleStartParameters();

        loadSettingsFile(appSettingFile, function(settings) {
          loadedSettings = settings;
          loadSettingsFile(appSettingTagsFile, function(settingsTags) {
            loadedSettingsTags = settingsTags;
            TSCORE.initApp();
          });
        });
      },
      function(err) {
        console.log("File System Error: " + JSON.stringify(err));
      }
    );
  }

  function getFile(fullPath, result, fail) {

    var filePath = normalizePath(fullPath);

    fsRoot.getFile(filePath, {create: false},
      function(fileEntry) {
        fileEntry.file(function(file) { 
          result(file); 
        }, fail);
      },
      fail
    );

  }

  function getFileContent(fullPath, result, error) {

    getFile(fullPath, function(file) {
      var reader = new FileReader();
      reader.onerror = function() {
        error(reader.error);
      };

      reader.onload = function() {
        result(reader.result);
      };

      reader.readAsArrayBuffer(file);
    }, error);
  }

  // TODO recursively calling callback not really working        
  function scanDirectory(entries) {
    var i;
    for (i = 0; i < entries.length; i++) {
      if (entries[i].isFile) {
        console.log("File: " + entries[i].name);
        anotatedDirListing.push({
          "name": entries[i].name,
          "isFile": entries[i].isFile,
          "size": "", // TODO
          "lmdt": "", //
          "path": entries[i].fullPath
        });
      } else {
        var directoryReader = entries[i].createReader();
        pendingRecursions++;
        directoryReader.readEntries(
          scanDirectory,
          function(error) {
            console.log("Error reading dir entries: " + error.code);
          }); // jshint ignore:line
      }
    }
    pendingRecursions--;
    console.log("Pending recursions: " + pendingRecursions);
    if (pendingRecursions <= 0) {
      TSPOSTIO.createDirectoryIndex(anotatedDirListing);
    }
  }

  var anotatedDirListing;
  var pendingRecursions = 0;
  var createDirectoryIndex = function(dirPath) {
    dirPath = dirPath + "/"; // TODO make it platform independent
    dirPath = normalizePath(dirPath);
    console.log("Creating index for directory: " + dirPath);
    anotatedDirListing = [];
    pendingRecursions = 0;
    fsRoot.getDirectory(dirPath, {
        create: false,
        exclusive: false
      },
      function(dirEntry) {
        var directoryReader = dirEntry.createReader();

        // Get a list of all the entries in the directory
        pendingRecursions++;
        directoryReader.readEntries(
          scanDirectory,
          function(error) { // error get file system
            console.log("Dir List Error: " + error.code);
          }
        );
      },
      function(error) {
        console.log("Getting dir: " + dirPath + " failed with error code: " + error.code);
      }
    );
  };

  function generateDirectoryTree(entries) {
    var tree = {};
    var i;
    for (i = 0; i < entries.length; i++) {
      if (entries[i].isFile) {
        console.log("File: " + entries[i].name);
        tree.children.push({
          "name": entries[i].name,
          "isFile": entries[i].isFile,
          "size": "", // TODO size and lmtd
          "lmdt": "", // 
          "path": entries[i].fullPath
        });
      } else {
        var directoryReader = entries[i].createReader();
        pendingCallbacks++;
        directoryReader.readEntries(
          generateDirectoryTree,
          function(error) {
            console.log("Error reading dir entries: " + error.code);
          }); // jshint ignore:line
      }
    }
    pendingCallbacks--;
    console.log("Pending recursions: " + pendingCallbacks);
    if (pendingCallbacks <= 0) {
      TSPOSTIO.createDirectoryTree(anotatedTree);
    }
  }

  var anotatedTree;
  var pendingCallbacks = 0;
  var createDirectoryTree = function(dirPath) {
    console.log("Creating directory index for: " + dirPath);
    //TSCORE.showAlertDialog("Creating directory tree is not supported on Android yet.");                 

  };

  function normalizePath(path) {
    //we set absoilute path because some extensions didn't recognize cdvfile
    //but in cordova.api implementation we didn't need absolute path so we strip nativeURL
    if (path.indexOf(fsRoot.nativeURL) === 0) {
      path = path.replace(fsRoot.nativeURL , "/");
    }

    if (path.indexOf(fsRoot.fullPath) === 0) {
      path = path.substring(fsRoot.fullPath.length, path.length);
    }
    return path;
  }

  var checkNewVersion = function() {
    console.log("Checking for new version...");
    var cVer = TSCORE.Config.DefaultSettings.appVersion + "." + TSCORE.Config.DefaultSettings.appBuild;
    $.ajax({
        url: 'http://tagspaces.org/releases/version.json?pVer=' + cVer,
        type: 'GET'
      })
      .done(function(data) {
        TSPOSTIO.checkNewVersion(data);
      })
      .fail(function(data) {
        console.log("AJAX failed " + data);
      });
  };

  var listSubDirectories = function(dirPath) {
    console.log("Listing sub directories of: " + dirPath);
    // directory path format DCIM/Camera/ !
    if (dirPath.lastIndexOf("/") === 0 || dirPath.lastIndexOf("/")  != dirPath.length - 1) {
      dirPath = dirPath + "/"; // TODO make it platform independent  
    }
    
    dirPath = normalizePath(dirPath);
    console.log("Listing sub directories of : " + dirPath + " normalized.");
    TSCORE.showLoadingAnimation();

    fsRoot.getDirectory(dirPath, {
        create: false,
        exclusive: false
      },
      function(dirEntry) {
        var directoryReader = dirEntry.createReader();

        // Get a list of all the entries in the directory
        directoryReader.readEntries(
          function(entries) {
            var i;
            var anotatedDirList = [];
            for (i = 0; i < entries.length; i++) {
              if (entries[i].isDirectory) {
                anotatedDirList.push({
                  "name": entries[i].name,
                  "path": entries[i].fullPath
                });
              }
            }
            //console.log("Dir content: " + JSON.stringify(entries));
            TSPOSTIO.listSubDirectories(anotatedDirList, dirPath);
          },
          function(error) { // error get file system
            //TSPOSTIO.errorOpeningPath(dirPath);
            console.log("Listing sub directories failed: " + error.code);
          }
        );
      },
      function(error) {
        //TSPOSTIO.errorOpeningPath(dirPath);
        console.log("Getting sub directories of : " + dirPath + " failed: " + error.code);
      }
    );
  };

  function resolveFullPath(localURL) {
    //Cordova file plugin didn't set fullpath so we set fullpath as absolute
    //this solve problem with extensions which can't use the cdvfile
    var URL = "cdvfile://localhost/persistent/";
    var fullPath = decodeURIComponent(localURL);
    if (fullPath.indexOf("cdvfile://localhost/root/") === 0) {
      URL = "cdvfile://localhost/root/";
    }

    fullPath = fsRoot.nativeURL + fullPath.substring(URL.length, fullPath.length);
    return fullPath;
  }

  var listDirectory = function(dirPath) {
    TSCORE.showLoadingAnimation();

    /*window.resolveLocalFileSystemURL(dirPath, function(entry) {
        console.log("--------"+entry.name);
    }, function(e) {
        console.log("-----"+e);
    });*/

    // directory path format DCIM/Camera/ !
    dirPath = dirPath + "/"; // TODO make it platform independent
    dirPath = normalizePath(dirPath);

    console.log("Listing directory: " + dirPath);

    fsRoot.getDirectory(dirPath, {
        create: false,
        exclusive: false
      },
      function(dirEntry) {
        var directoryReader = dirEntry.createReader();
        var anotatedDirList = [];
        var pendingCallbacks = 0;
        // Get a list of all the entries in the directory
        directoryReader.readEntries(
          function(entries) {
            var i;
            var normalizedPath;
            for (i = 0; i < entries.length; i++) {
              if (entries[i].isFile) {
                pendingCallbacks++;
                entries[i].file(
                  function(entry) {
                   
                    if (!entry.fullPath) {
                      entry.fullPath = resolveFullPath(entry.localURL);
                    }

                    anotatedDirList.push({
                      "name": entry.name,
                      "isFile": true,
                      "size": entry.size,
                      "lmdt": entry.lastModifiedDate,
                      "path": entry.fullPath
                    });
                    pendingCallbacks--;
                    console.log("File: " + entry.name + " Size: " + entry.size + " i:" + i + " Callb: " + pendingCallbacks);
                    if (pendingCallbacks === 0 && i === entries.length) {
                      TSPOSTIO.listDirectory(anotatedDirList);
                    }
                  }, // jshint ignore:line
                  function(error) { // error get file system
                    console.log("listDirectory error: " + JSON.stringify(error));
                    pendingCallbacks--;
                    if (pendingCallbacks === 0 && i === entries.length) {
                      TSPOSTIO.listDirectory(anotatedDirList);
                    }
                  } // jshint ignore:line
                ); // jshint ignore:line
              } else {
                normalizedPath = normalizePath(entries[i].fullPath);
                anotatedDirList.push({
                  "name": entries[i].name,
                  "isFile": false,
                  "size": "",
                  "lmdt": "",
                  "path": normalizedPath
                });
                console.log("Dir: " + entries[i].name + " I:" + i + " Callb: " + pendingCallbacks);
                if ((pendingCallbacks === 0) && ((i + 1) == entries.length)) {
                  TSPOSTIO.listDirectory(anotatedDirList);
                }
              }

            }
            if (pendingCallbacks === 0) {
              TSPOSTIO.listDirectory(anotatedDirList);
            }
            //console.log("Dir content: " + JSON.stringify(entries));

          },
          function(error) { // error get file system
            TSPOSTIO.errorOpeningPath(dirPath);
            console.log("Dir List Error: " + error.code);
          }
        );
      },
      function(error) {
        TSPOSTIO.errorOpeningPath(dirPath);
        console.log("Getting dir: " + dirPath + " failed with error code: " + error.code);
      }
    );
  };

  var getDirectoryMetaInformation = function(dirPath, readyCallback) {
      
    console.log("getDirectoryMetaInformation directory: " + dirPath);
    dirPath = dirPath + "/"; // TODO make it platform independent
    dirPath = normalizePath(dirPath);

    fsRoot.getDirectory(dirPath, {
        create: false,
        exclusive: false
      },
      function(dirEntry) {
        var directoryReader = dirEntry.createReader();
        var anotatedDirList = [];
        // Get a list of all the entries in the directory
        directoryReader.readEntries(
          function(entries) {
            var i;
            var normalizedPath;
            for (i = 0; i < entries.length; i++) {
              if (entries[i].isFile) {
               
                entries[i].file(
                  function(entry) {
                    if (!entry.fullPath) {
                      entry.fullPath = resolveFullPath(entry.localURL);
                    }
                    anotatedDirList.push({
                      "name": entry.name,
                      "isFile": true,
                      "size": entry.size,
                      "lmdt": entry.lastModifiedDate,
                      "path": entry.fullPath
                    });
                    TSCORE.metaFileList = (anotatedDirList);
                  }, // jshint ignore:line
                  function(error) { // error get file system
                    console.log("listDirectory error: " + JSON.stringify(error));
                  } // jshint ignore:line
                ); // jshint ignore:line
              } 
            }
            if (readyCallback) {
              readyCallback(anotatedDirList);
            }
          }
        );
      }
    );
  };

  var deleteElement = function(filePath) {
    console.log("Deleting: " + filePath);
    TSCORE.showLoadingAnimation();

    var path = normalizePath(filePath);

    fsRoot.getFile(path, {
        create: false,
        exclusive: false
      },
      function(entry) {
        entry.remove(
          function() {
            console.log("file deleted: " + path);
            TSPOSTIO.deleteElement(filePath);
          },
          function() {
            console.log("error deleting: " + filePath);
          }
        );
      },
      function() {
        console.log("error getting file");
      }
    );
  };

  var deleteDirectory = function(dirPath) {
    console.log("Deleting directory: " + dirPath);
    TSCORE.showLoadingAnimation();

    var path = normalizePath(dirPath);

    fsRoot.getDirectory(path, {
        create: false,
        exclusive: false
      },
      function(entry) {
        entry.remove(
          function() {
            console.log("file deleted: " + path);
            TSPOSTIO.deleteDirectory(dirPath);
          },
          function() {
            TSPOSTIO.deleteDirectoryFailed(path);
            console.log("error deleting dir: " + dirPath);
          }
        );
      },
      function() {
        console.log("error getting directory");
      }
    );
  };

  var loadTextFile = function(filePath, isPreview) {
    console.log("Loading file: " + filePath);
    TSCORE.showLoadingAnimation();

    filePath = normalizePath(filePath);
    fsRoot.getFile(filePath, {
        create: false,
        exclusive: false
      },
      function(entry) {
        entry.file(
          function(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
              TSPOSTIO.loadTextFile(evt.target.result);
            };
            if (isPreview) {
              reader.readAsText(file.slice(0, 10000));
            } else {
              reader.readAsText(file);
            }
          },
          function() {
            console.log("error getting file: " + filePath);
          }
        );
      },
      function() {
        console.log("Error getting file entry: " + filePath);
      }
    );
  };

  var saveTextFile = function(filePath, content, overWrite, silentMode) {
    console.log("Saving file: " + filePath);
    TSCORE.showLoadingAnimation();

    // Handling the UTF8 support for text files
    var UTF8_BOM = "\ufeff";

    if (content.indexOf(UTF8_BOM) === 0) {
      console.log("Content beging with a UTF8 bom");
    } else {
      content = UTF8_BOM + content;
    }

    var isFileNew = true;

    filePath = normalizePath(filePath);

    // Checks if the file already exists
    fsRoot.getFile(filePath, {
        create: false,
        exclusive: false
      },
      function(entry) {
        if (entry.isFile) {
          isFileNew = false;
        }
        saveFile(isFileNew);
      },
      function() {
        saveFile(isFileNew);
      }
    );

    function saveFile(isFileNew, silentMode) {
      fsRoot.getFile(filePath, {
          create: true,
          exclusive: false
        },
        function(entry) {
          entry.createWriter(
            function(writer) {
              writer.onwriteend = function(evt) {
                if (silentMode !== true) {
                  TSPOSTIO.saveTextFile(fsRoot.fullPath + "/" + filePath, isFileNew);
                }
              };
              writer.write(content);
            },
            function() {
              console.log("error creating writter file: " + filePath);
            }
          );
        },
        function() {
          console.log("Error getting file entry: " + filePath);
        }
      );
    }
  };

  var saveBinaryFile = function(filePath, content, overWrite, silentMode) {
    console.log("Saving file: " + filePath);
    TSCORE.showLoadingAnimation();

    var isFileNew = true;

    filePath = normalizePath(filePath);

    // Checks if the file already exists
    fsRoot.getFile(filePath, {
        create: false,
        exclusive: false
      },
      function(entry) {
        if (entry.isFile) {
          isFileNew = false;
        }
      },
      function() {}
    );

    if (isFileNew || overWrite === true) {
      fsRoot.getFile(filePath, {
          create: true,
          exclusive: false
        },
        function(entry) {
          entry.createWriter(
            function(writer) {
              writer.onwriteend = function(evt) {
                if (silentMode !== true) {
                  TSPOSTIO.saveBinaryFile(fsRoot.fullPath + "/" + filePath);
                }
              };
              var dataView = new Int8Array(content);
              writer.write(dataView.buffer);
            },
            function() {
              console.log("error creating writter file: " + filePath);
            }
          );
        },
        function() {
          console.log("Error getting file entry: " + filePath);
        }
      );
    } else {
      TSCORE.showAlertDialog($.i18n.t("ns.common:fileExists", { fileName:filePath }));
    }
  };

  var createDirectory = function(dirPath, silentMode) {
    console.log("Creating directory: " + dirPath);
    TSCORE.showLoadingAnimation();

    dirPath = normalizePath(dirPath);

    fsRoot.getDirectory(dirPath, {
        create: true,
        exclusive: false
      },
      function(dirEntry) {
        if (silentMode !== true) {
          TSPOSTIO.createDirectory(dirPath);
        }
      },
      function(error) {
        console.log("Creating directory failed: " + dirPath + " failed with error code: " + error.code);
      }
    );
  };

  var copyFile = function(filePath, newFilePath) {
    filePath = normalizePath(filePath);
    var newFileName = newFilePath.substring(newFilePath.lastIndexOf('/') + 1);
    var newFileParentPath = normalizePath(newFilePath.substring(0, newFilePath.lastIndexOf('/')));
    // TODO check if the newFilePath exist or causes issues by copying
    fsRoot.getDirectory(newFileParentPath, {
        create: false,
        exclusive: false
      },
      function(parentDirEntry) {
        fsRoot.getFile(filePath, {
            create: false,
            exclusive: false
          },
          function(entry) {
            entry.copyTo(
              parentDirEntry,
              newFileName,
              function() {
                console.log("File copy: target: " + newFilePath + " source: " + entry.fullPath);
                TSPOSTIO.copyFile(entry.fullPath, newFilePath);
              },
              function() {
                console.log("error copying: " + filePath);
              }
            );
          },
          function() {
            console.log("Error getting file: " + filePath);
          }
        );
      },
      function(error) {
        console.log("Getting dir: " + newFileParentPath + " failed with error code: " + error.code);
      }
    );
  };

  var renameFile = function(filePath, newFilePath) {
    filePath = normalizePath(filePath);
    var newFileName = newFilePath.substring(newFilePath.lastIndexOf('/') + 1);
    var newFileParentPath = normalizePath(newFilePath.substring(0, newFilePath.lastIndexOf('/') + 1));
    console.log("renameFile: " + newFileName + " newFilePath: " + newFilePath);
    // TODO check if the newFilePath exist or causes issues by renaming
    fsRoot.getDirectory(newFileParentPath, {
        create: false,
        exclusive: false
      },
      function(parentDirEntry) {
        fsRoot.getFile(filePath, {
            create: false,
            exclusive: false
          },
          function(entry) {
            entry.moveTo(
              parentDirEntry,
              newFileName,
              function() {
                console.log("File renamed to: " + newFilePath + " Old name: " + entry.fullPath);
                TSPOSTIO.renameFile(entry.fullPath, newFilePath);
              },
              function() {
                console.log("error renaming: " + filePath);
              }
            );
          },
          function() {
            console.log("Error getting file: " + filePath);
          }
        );
      },
      function(error) {
        console.log("Getting dir: " + newFileParentPath + " failed with error code: " + error.code);
      }
    );
  };

  var renameDirectory = function(dirPath, newDirName) {
    var newDirPath = TSCORE.TagUtils.extractParentDirectoryPath(dirPath) + TSCORE.dirSeparator + newDirName;
    TSCORE.showLoadingAnimation();

    dirPath = normalizePath(dirPath);
    var newDirParentPath = normalizePath(newDirPath.substring(0, newDirPath.lastIndexOf('/')));
    // TODO check if the newFilePath exist or cause issues by renaming
    fsRoot.getDirectory(newDirParentPath, {
        create: false,
        exclusive: false
      },
      function(parentDirEntry) {
        fsRoot.getDirectory(dirPath, {
            create: false,
            exclusive: false
          },
          function(entry) {
            entry.moveTo(
              parentDirEntry,
              newDirName,
              function() {
                console.log("Directory renamed to: " + newDirPath + " Old name: " + entry.fullPath);
                TSPOSTIO.renameDirectory(entry.fullPath, newDirPath);
              },
              function() {
                console.log("error renaming: " + dirPath);
              }
            );
          },
          function() {
            console.log("Error getting directory: " + dirPath);
          }
        );
      },
      function(error) {
        console.log("Getting dir: " + newDirParentPath + " failed with error code: " + error.code);
      }
    );
  };

  var selectDirectory = function() {
    console.log("Open select directory dialog.");
    //file:///storage/emulated/0/DCIM/Camera/
    TSCORE.showDirectoryBrowserDialog(fsRoot.fullPath);
  };

  var selectFile = function() {
    console.log("Operation selectFile not supported.");
  };

  var checkAccessFileURLAllowed = function() {
    console.log("checkAccessFileURLAllowed function not relevant for Android..");
  };

  var openDirectory = function(dirPath) {
    TSCORE.showAlertDialog($.i18n.t("ns.dialogs:openContainingDirectoryAlert"));
    //dirPath = normalizePath(dirPath);
    //window.open(dirPath,"_blank", "location=no");        
  };

  var openFile = function(filePath) {
    console.log("Opening natively: " + filePath);
    window.plugins.fileOpener.open(filePath);
    //window.open(filePath,"_blank", "location=no");
  };

  var sendFile = function(filePath) {
    console.log("Sending file: " + filePath);
    window.plugins.fileOpener.send(filePath);
  };

  var openExtensionsDirectory = function() {
    TSCORE.showAlertDialog($.i18n.t("ns.common:functionalityNotImplemented"));
  };

  var getFileProperties = function(filePath) {
    filePath = normalizePath(filePath);
    var fileProperties = {};
    fsRoot.getFile(filePath, {
        create: false,
        exclusive: false
      },
      function(entry) {
        if (entry.isFile) {
          entry.file(
            function(file) {
              fileProperties.path = entry.fullPath;
              fileProperties.size = file.size;
              fileProperties.lmdt = file.lastModifiedDate;
              fileProperties.mimetype = file.type;
              TSPOSTIO.getFileProperties(fileProperties);
            },
            function() {
              console.log("Error retrieving file properties of " + filePath);
            }
          );
        } else {
          console.log("Error getting file properties. " + filePath + " is directory");
        }
      },
      function() {
        console.log("error getting file");
      }
    );
  };

  // Bring the TagSpaces window on top of the windows
  var focusWindow = function() {
    console.log("Focusing window is not implemented yet.");
  };

  exports.focusWindow = focusWindow;
  exports.createDirectory = createDirectory;
  exports.copyFile = copyFile;
  exports.renameFile = renameFile;
  exports.renameDirectory = renameDirectory;
  exports.loadTextFile = loadTextFile;
  exports.saveTextFile = saveTextFile;
  exports.saveBinaryFile = saveBinaryFile;
  exports.listDirectory = listDirectory;
  exports.listSubDirectories = listSubDirectories;
  exports.deleteElement = deleteElement;
  exports.deleteDirectory = deleteDirectory;
  exports.createDirectoryIndex = createDirectoryIndex;
  exports.createDirectoryTree = createDirectoryTree;
  exports.selectDirectory = selectDirectory;
  exports.openDirectory = openDirectory;
  exports.openFile = openFile;
  exports.sendFile = sendFile;
  exports.selectFile = selectFile;
  exports.openExtensionsDirectory = openExtensionsDirectory;
  exports.checkAccessFileURLAllowed = checkAccessFileURLAllowed;
  exports.checkNewVersion = checkNewVersion;
  exports.getFileProperties = getFileProperties;
  exports.handleStartParameters = handleStartParameters;
  exports.saveSettings = saveSettings;
  exports.loadSettings = loadSettings;
  exports.saveSettingsTags = saveSettingsTags;
  exports.loadSettingsTags = loadSettingsTags;
  exports.getFile = getFile;
  exports.getFileContent = getFileContent;
  exports.getDirectoryMetaInformation = getDirectoryMetaInformation;
});
