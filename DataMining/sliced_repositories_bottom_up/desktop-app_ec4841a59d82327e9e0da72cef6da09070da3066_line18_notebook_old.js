Notebook.curNotebookId = "";
Notebook.cache = {}; // notebookId => {};
Notebook.notebooks = []; // 按次序
Notebook.notebookNavForListNote = ""; // html 为了note list上面和新建时的ul
Notebook.notebookNavForNewNote = ""; // html 为了note list上面和新建时的ul
Notebook.setCache = function(notebook) {
	var notebookId = notebook.NotebookId;
	if(!Notebook.cache[notebookId]) {
		Notebook.cache[notebookId] = {};
	}
}
