Notebook.curNotebookId = "";
Notebook.cache = {}; // notebookId => {};
Notebook.notebooks = []; // 按次序
Notebook.notebookNavForListNote = ""; // html 为了note list上面和新建时的ul
Notebook.setCache = function(notebook) {
    var notebookId = notebook.NotebookId;
    if (!Notebook.cache[notebookId]) {
        Notebook.cache[notebookId] = {};
    }
};
Notebook.getCurNotebookId = function() {
};
Notebook.getCurNotebook = function() {
};
Notebook._newNotebookNumberNotes = {}; // notebookId => count
Notebook._subNotebookNumberNotes = {};
Notebook.reRenderNotebookNumberNotesIfIsNewNotebook = function(notebookId) {
};
Notebook.updateNotebookNumberNotes = function(notebookId, count) {
    if (!notebook) {
        Notebook._newNotebookNumberNotes[notebookId] = count;
    }
    if (!$("#numberNotes_" + notebookId).length) {
        Notebook._subNotebookNumberNotes[notebookId] = count;
    }
};
Notebook._updateNotebookNumberNotes = function(notebookId, n) {
};
Notebook.incrNotebookNumberNotes = function(notebookId) {
};
Notebook.minusNotebookNumberNotes = function(notebookId) {
};
Notebook.getNotebook = function(notebookId) {
};
Notebook.getNotebookTitle = function(notebookId) {
}
Notebook.getSubNotebooks = function(parentNotebookId) {
};
Notebook.getSimpleTreeSetting = function(options) {
}
Notebook.getTreeSetting = function(isSearch, isShare) {
    var self = this;
    var setting = {
        view: {
            showLine: false,
            showIcon: false,
            selectedMulti: false,
            dblClickExpand: false,
            addDiyDom: addDiyDom
        },
        data: {
            key: {
                name: "Title",
                children: "Subs",
            }
        },
        edit: {
            enable: true,
            showRemoveBtn: false,
            showRenameBtn: false,
            drag: {
                isMove: noSearch,
                prev: noSearch,
                inner: noSearch,
                next: noSearch
            }
        },
        callback: {
            beforeDrag: beforeDrag,
            beforeDrop: beforeDrop,
            onDrop: onDrop,
            onClick: onClick,
            onDblClick: onDblClick,
            onExpand: function(event, treeId, treeNode) {
                // 展开时, 会有子笔记本, 如果之前有设置数量, 则重新设置
                // 为了防止移动, 复制过来时没有该sub
                if (treeNode.isParent) {
                    var childNotes = self.getSubNotebooks(treeNode.NotebookId);
                    if (childNotes) {
                        childNotes.forEach(function(node) {
                            var notebookId = node.NotebookId;
                            if (Notebook._subNotebookNumberNotes[notebookId] !== undefined) {
                                $('#numberNotes_' + notebookId).html(Notebook._subNotebookNumberNotes[notebookId]);
                                Notebook._subNotebookNumberNotes[notebookId] = undefined;
                            }
                            // 子的dirty, new状态
                            Notebook.setDirtyOrNewForSub(notebookId);
                        });
                    }
                }
            },
            beforeRename: function(treeId, treeNode, newName, isCancel) {
                if (newName == "") {
                    if (treeNode.IsNew) {
                        // 删除之
                        self.tree.removeNode(treeNode);
                        return true;
                    }
                    return false;
                }
                if (treeNode.Title == newName) {
                    return true;
                }

                // 如果是新添加的
                if (treeNode.IsNew) {
                    var parentNode = treeNode.getParentNode();
                    var parentNotebookId = parentNode ? parentNode.NotebookId : "";

                    self.doAddNotebook(treeNode.NotebookId, newName, parentNotebookId);
                } else {
                    self.doUpdateNotebookTitle(treeNode.NotebookId, newName);
                }
                return true;
            }
        }
    };
};
Notebook.allNotebookId = "0";
Notebook.trashNotebookId = "-1";
Notebook.curNotebookIsTrashOrAll = function() {
};
Notebook.curNotebookIsTrash = function() {
};
Notebook.renderNotebooks = function(notebooks, reload) {
    if (!notebooks || typeof notebooks != "object" || notebooks.length < 0) {
        notebooks = [];
    }
    notebooks = [{ NotebookId: Notebook.allNotebookId, Title: getMsg("all"), drop: false, drag: false }].concat(notebooks);
    Notebook.notebooks = notebooks; // 缓存之
    if (!isEmpty(notebooks)) {
        Notebook.curNotebookId = notebooks[0].NotebookId;
    }
};
Notebook.cacheAllNotebooks = function(notebooks) {
    for (var i in notebooks) {
        var notebook = notebooks[i];
        Notebook.cache[notebook.NotebookId] = notebook;
    }
};
Notebook.expandNotebookTo = function(notebookId, userId) {
};
Notebook.renderNav = function(nav) {
};
Notebook.searchNotebookForAddNote = function(key) {
};
Notebook.searchNotebookForList = function(key) {
};
Notebook.everNotebooks = [];
Notebook.changeNav = function() {
};
Notebook.renderShareNotebooks = function(sharedUserInfos, shareNotebooks) {
}
Notebook.selectNotebook = function(target) {
};
Notebook.changeNotebookNavForNewNote = function(notebookId, title) {
    if (!notebookId) {
        var notebook = Notebook.notebooks[0];
        notebookId = notebook.NotebookId;
        title = notebook.Title;
    }
    if (!title) {
        var notebook = Notebook.cache[0];
        title = notebook.Title;
    }
    } else if (!$("#curNotebookForNewNote").attr("notebookId")) {
        if (Notebook.notebooks.length > 2) {
            var notebook = Notebook.notebooks[1];
            notebookId = notebook.NotebookId;
            title = notebook.Title;
        }
    }
}
Notebook.toggleToMyNav = function(userId, notebookId) {
};
Notebook.changeNotebookNav = function(notebookId) {
    Notebook.curNotebookId = notebookId;
};
Notebook.isAllNotebookId = function(notebookId) {
};
Notebook.isTrashNotebookId = function(notebookId) {
};
Notebook.curActiveNotebookIsAll = function() {
};
Notebook.curActiveNotebookIsTrash = function() {
};
Notebook.renderCurNotebook = function() {
    }
Notebook.changeNotebookSeq = 1;
Notebook.changeNotebook = function(notebookId, callback, needRendNoteId) {
    Notebook.curNotebookId = notebookId;
    var cacheNotes = null;
};
