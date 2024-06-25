.controller('ComponentsOverviewController', ['$scope', '$q', '$mdDialog', '$mdToast', '$animate','FileService',
	function ($scope, $q, $mdDialog, $mdToast, $animate, FileService) {
	$scope.controllerList = [];
	$scope.serviceList = [];
	$scope.directiveList = [];
	$scope.filterList = [];
	var indexPath = localStorage.currentProjectPath + "/www/index.html";

	$scope.init = function() {
		getAllComponents("controllers").then(function (result) {
			if(!result.hasOwnProperty('empty')) {
				$scope.controllerList = result;
			} else {
				$scope.controllerListEmpty = true;
			}
			getAllComponents("services").then(function (result) {
				if(!result.hasOwnProperty('empty')) {
					$scope.serviceList = result;
				} else {
					$scope.serviceListEmpty = true;
				}
				getAllComponents("directives").then(function (result) {
					if(!result.hasOwnProperty('empty')) {
						$scope.directiveList = result;
					} else {
						$scope.directiveListEmpty = true;
					}
					getAllComponents("filters").then(function (result) {
						if(!result.hasOwnProperty('empty')) {
							$scope.filterList = result;
						} else {
							$scope.filterListEmpty = true;
						}
					});
				});
			});
		});
	};
	var getAllComponents = function(componentType) {
		var componentRegionRegex;
		var componentNameRegex;
		var allComponentLines;
		var componentArray = [];
		switch(componentType) {
				componentRegionRegex = /<!-- BEGIN CONTROLLERS -->([\w\W]*)<!-- END CONTROLLERS -->/i;
				componentNameRegex = /\<script type="text\/javascript" src="js\/controllers\/(.*)\.js"\>\<\/script\>/i;
				componentRegionRegex = /<!-- BEGIN SERVICES -->([\w\W]*)<!-- END SERVICES -->/i;
				componentNameRegex = /\<script type="text\/javascript" src="js\/services\/(.*)\.js"\>\<\/script\>/i;
				componentRegionRegex = /<!-- BEGIN DIRECTIVES -->([\w\W]*)<!-- END DIRECTIVES -->/i;
				componentNameRegex = /\<script type="text\/javascript" src="js\/directives\/(.*)\.js"\>\<\/script\>/i;
				componentRegionRegex = /<!-- BEGIN FILTERS -->([\w\W]*)<!-- END FILTERS -->/i;
				componentNameRegex = /\<script type="text\/javascript" src="js\/filters\/(.*)\.js"\>\<\/script\>/i;
				componentRegionRegex = null;
				componentNameRegex = null;
		}
		if(componentRegionRegex !== null && componentNameRegex !== null) {
			FileService.readFile(indexPath).then(function (result) {
				allComponentLines = result.success.match(componentRegionRegex);
				if(typeof(allComponentLines[1]) !== "undefined") {
					componentArray = allComponentLines[1].split("\n");
					for (var i = 0; i < componentArray.length; i++) {
						if(componentArray[i].length > 0) {
							var componentName = componentArray[i].match(componentNameRegex);
							if(componentName != null) {
								componentList.push({
									name: componentName[1]
								});
							}
						}
					};
				} else {
			});
		}
	};
	$scope.markMissingFiles = function() {
	};
	$scope.showAddComponentDialog = function(ev) {
	};
	var addComponent = function(componentType, componentName) {
		getAllComponents(componentType).then(function (result) {
			var filePath = localStorage.currentProjectPath + "/www/js/" + componentType + "/" + componentName + ".js";
			var testFilePath = localStorage.currentProjectPath + "/www/tests/unit/" + componentType + "/" + componentName + ".spec.js";
			var linesToAdd = '\n' + '<script type="text/javascript" src="js/'+ componentType + '.js"></script>' + '\n';
			for (var i = 0; i < result.length; i++) {
				linesToAdd += '<script type="text/javascript" src="js/' + componentType + '/' + result[i].name + '.js"></script>' + '\n';
			};
			FileService.readFile(indexPath).then(function (result) {
				switch(componentType) {
					case "controllers":
						var dataToReplace = result.success.match(/(?:<!-- BEGIN CONTROLLERS -->)([\w\W]*)(?:<!-- END CONTROLLERS -->)/i);
						break;
						var dataToReplace = result.success.match(/(?:<!-- BEGIN SERVICES -->)([\w\W]*)(?:<!-- END SERVICES -->)/i);
						var dataToReplace = result.success.match(/(?:<!-- BEGIN DIRECTIVES -->)([\w\W]*)(?:<!-- END DIRECTIVES -->)/i);
						var dataToReplace = result.success.match(/(?:<!-- BEGIN FILTERS -->)([\w\W]*)(?:<!-- END FILTERS -->)/i);
						var dataToReplace = null;
				}
				if(dataToReplace !== null) {
					var content = result.success.replace(dataToReplace[1], linesToAdd);
					FileService.writeFile(indexPath, content).then(function (result) {
						var folders = componentName.split("/");
						var foldersWithoutFile = "";
						for (var i = 0; i < folders.length; i++) {
							foldersWithoutFile += folders[i] + "/";
						};
						if(componentName.indexOf("/") > -1) {
							FileService.createFolders(localStorage.currentProjectPath + "/www/js/" + componentType +"/" + foldersWithoutFile).then(function (result) {
								FileService.createFile(filePath).then(function (result) {
									FileService.createFolders(localStorage.currentProjectPath + "/www/tests/unit/" + componentType +"/" + foldersWithoutFile).then(function (result) {
										FileService.createFile(testFilePath).then(function (result) {
											$scope.init();
										});
									});
								});
							});
						} else {
					});
				} else {
			});
		});
	};
}])
