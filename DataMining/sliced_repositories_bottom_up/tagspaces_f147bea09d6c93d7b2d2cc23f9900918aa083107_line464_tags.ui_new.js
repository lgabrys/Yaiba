var TagsUI = (typeof TagsUI == 'object' && TagsUI != null) ? TagsUI : {};
TagsUI.initContextMenus = function() {
    $( "#extensionMenu" ).menu({
        select: function( event, ui ) {
            switch (ui.item.attr( "action" )) {
                break;
            }
        }
    });
    $( "#tagMenu" ).menu({
        select: function( event, ui ) {
            switch (ui.item.attr( "action" )) {
                break;
                break;
              case "editTag":
            }
        }
    });
    $( "#tagTreeMenu" ).menu({
        select: function( event, ui ) {
            switch (ui.item.attr( "action" )) {
                break;
            }
        }
    });
    $( "#fileMenu" ).menu({
        select: function( event, ui ) {
            switch (commandName) {
                break;
            }
        }
    });
}
TagsUI.initDialogs = function() {
    var newDirName = $( "#dirname" );
    var newFileName = $( "#newFileName" );
    var renamedFileName = $( "#renamedFileName" );
    var smartTag = $( "#smartTagName" );
    var allFields = $( [] ).add( newDirName );
    var tips = $( ".validateTips" );
    function updateTips( t ) {
        tips
    }
    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
        } else {
    }
    $( "#dialog-confirmtagremove" ).dialog({
        modal: true,
        buttons: {
            "Remove": function() {
                $( this ).dialog( "close" );
            },
        }
    });
    $( "#dialog-confirmtagdelete" ).dialog({
        buttons: {
            Cancel: function() {
            }
        }
    });
    $( "#dialog-confirmtaggroupdelete" ).dialog({
        modal: true,
    });
    $( "#dialog-tagedit" ).dialog({
        buttons: {
        }
    });
    $( "#dialog-taggroupDupicate" ).dialog({
        autoOpen: false,
        resizable: false,
        buttons: {
            Cancel: function() {
            }
        }
    });
}
TagsUI.generateTagGroups = function() {
    for(var i=0; i < TSSETTINGS.Settings["tagGroups"].length; i++) {
        $("#tagGroups").append($("<h3>", {
        .append($("<span>", {
        })
        )
        .append($("<span>", {
        .click( function(event) {
                UIAPI.selectedTag = $(this).attr("tag");
                UIAPI.selectedTagData = TSSETTINGS.getTagGroupData($(this).attr("key"));
                UIAPI.selectedTagData.parentKey = undefined;
        })
        )
        );
        for(var j=0; j < TSSETTINGS.Settings["tagGroups"][i]["children"].length; j++) {
            tagButtons.append($("<button>", {
            .click( function() {
                UIAPI.selectedTag = $(this).attr("tag");
                UIAPI.selectedTagData = TSSETTINGS.getTagData($(this).attr("tag"), $(this).attr("parentKey"));
                UIAPI.selectedTagData.parentKey = $(this).attr("parentKey");
            })
            );
        }
    }
}
TagsUI.openTagMenu = function(tagButton, tag, fileName) {
    UIAPI.currentFilename = fileName;
    UIAPI.selectedTag = tag;
}
TagsUI.generateTagButtons = function(commaSeparatedTags, fileExtension, fileName, filePath) {
    var tagString = ""+commaSeparatedTags;
    var wrapper = $('<span>');
}
TagsUI.buttonizeTitle = function(title, fileName, filePath) {
    if(title.length < 1) {
    	title = "n/a";
    }
}
TagsUI.buttonizeFileName = function(fileName, filePath) {
    return $('<span>').append($('<button>', {
        	title: fileName,
        })).html();
}
