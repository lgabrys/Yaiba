var core = require('./core.js')
	, fs = require('fs')
	, editorNextId = 0
	, fileNameExp = /^(?:.*?[\/\\])?([^\/\\]+)$/
	, listCaptureExp = /^(\s*)((?:[*+-]|\d+\.) )(.*)$/
	, editors = []
	, activeEditor
;
function Editor(filePath, content){
	var self = this;
	self.editorId = editorNextId++;
	self.content = content;
	self.active = false;
	self.watcher = undefined;
	self.el = undefined;
	self.editor = undefined;
	self.initialized = false;
}

function initEditor(self, domElmt){
	self.el = global.$(domElmt).prop('id', 'content-' + self.editorId);
	self.editor = global.CodeMirror(self.el[0], {
		, lineNumbers: true
	});
	self.initialized = true;
}
Editor.prototype.init = function(domElmt){
	if( this.initialized ){
		throw "Editor already initialized";
	}
}
function setFilePath(self, filePath){
	self.filePath = filePath || '';
	self.fileName = filePath ? self.filePath.replace(fileNameExp, '$1') : 'New File';
}
Editor.prototype.changePath = function(newPath){
	setFilePath(this, newPath);
}
function fileWatchStop(self){
	if( self.watcher && self.watcher.close ){
		self.watcher = undefined;
	}
}
Editor.prototype.isDirty = function(){ return !! this.editor.isClean(); }
