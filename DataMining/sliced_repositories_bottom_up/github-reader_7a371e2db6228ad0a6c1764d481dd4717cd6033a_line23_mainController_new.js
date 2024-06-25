var scrollController = require("./scrollController");
var commentHeaderController = require("./commentHeaderViewController");
var listController = require("./listViewController");
var Promise = require("bluebird");
module.exports = function () {
    var listView = listController.reloadView();
    listView.$watch("selectedItem", function (item) {
        var currentIndex = listController.indexOfItem(item);
        var cellElement = listController.elementAtIndex(currentIndex);
        setImmediate(function () {
            document.getElementById("content-list").scrollTop = cellElement.offsetTop - 50;
        });
    });
};
