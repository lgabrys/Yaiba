/*
    MediaCenterJS - A NodeJS based mediacenter solution

    Copyright (C) 2014 - Jan Smolders

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/






var express = require('express')
    , app = express()
    , fs = require('fs-extra')
    , ini = require('ini')
    , semver = require('semver')
    , config = ini.parse(fs.readFileSync('./configuration/config.ini', 'utf-8'))
    , exec = require('child_process').exec
    , async = require('async')
    , npm = require('npm')
    , pluginPrefix = config.pluginPrefix
    , search = npm + ' search '
    , install = npm + ' install '
    , upgrade = npm + ' upgrade '
    , remove = npm + ' remove '
    , blackList = require('../../configuration/plugin-blacklist.js').blackList
    , configuration_handler = require('../../lib/handlers/configuration-handler')
    , logger = require('winston');
var getInstalledPlugins = function(){
    var nodeModules = __dirname + '/../../node_modules';
    var installedPlugins = [];
    fs.readdirSync(nodeModules).forEach(function(name){
        //Check if the folder in the node_modules starts with the prefix
        if(name.substr(0, pluginPrefix.length) !== pluginPrefix){
            return;
        }
        var info = {};
        var data = fs.readFileSync(nodeModules + '/' + name + '/package.json' , 'utf8');
        try {
            info = JSON.parse(data);
        } catch(e) {
            info.version = "0.0.0";
        }

        var plugin = {
            name: name,
            info: info
        };
    });
};
exports.getAvailablePlugins = function(req, res){
    var installedPlugins = getInstalledPlugins();
    var npmSearch = function(search, callback){
        npm.load([], function (err, npm) {
            } else {
                  npm.commands.search(search, function(err, res){
                    if (err) {
                    } else {
                    }
                });
            }
        });
    }

    npmSearch(["mediacenterjs-"], function(err, pluginList){
        if (!pluginList || err) {
            res.json({
            });
        } else {
            .filter(function (pluginName) {
                return blackList.indexOf(pluginName) === -1;
            })
            .map(function(pluginName) {
                var pluginObj = pluginList[pluginName];
                var compareInfo = isPluginCurrentlyInstalled(installedPlugins, pluginObj.name, pluginObj.version);
                var d = new Date(pluginObj.time);
                return {
                    name: pluginObj.name.replace(pluginPrefix, ''), //Remove the Mediacenterjs-
                    desc: pluginObj.description,
                    author: pluginObj.maintainers[0].replace('=',''),
                };
            });
        }
    });
};
