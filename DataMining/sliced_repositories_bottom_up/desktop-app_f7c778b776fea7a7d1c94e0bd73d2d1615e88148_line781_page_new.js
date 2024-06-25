// 主页渲染
//-------------

var Resize;

// 写作模式
var Writting = {
	_mode: 'normal', // writting
	themeWrittingO: $('#themeWritting'),
	writtingToggleO: $('#writtingToggle'),
	bodyO: $('body'),
	isWriting: function() {
		return this._mode != 'normal';
	},
	init: function() {
		var me = this;
		me.writtingToggleO.click(function() {
			me.toggle();
		});
	},

	// 初始化写作
	// 主要是markdown两列宽度问题
	initWritting: function() {
		var width = UserInfo.MdEditorWidthForWritting;
		// 设中间
		if(!width) {
			width = this.bodyO.width() / 2;
		}
		Resize.setMdColumnWidth(width);
		// $("#mceToolbar").css("height", "40px");
		resizeEditor();

		// 切换到写模式
		Note.toggleWriteable();
	},
	initNormal: function() {
		Resize.setMdColumnWidth(UserInfo.MdEditorWidth);
		// $("#mceToolbar").css("height", "30px");
		resizeEditor();
	},

	toggle: function() {
		var me = this;
		me.themeWrittingO.attr('disabled', me._mode != 'normal');
		me._mode = me._mode == 'normal' ? 'writting' : 'normal';

		// 改变icon
		if(me._mode != 'normal') {
			$('body').addClass('writting');
			me.writtingToggleO.find('.fa').removeClass('fa-expand').addClass('fa-compress');

			me.initWritting();
		} else {
			$('body').removeClass('writting');
			me.writtingToggleO.find('.fa').removeClass('fa-compress').addClass('fa-expand');
			me.initNormal();
		}
	},
};

// 拖拉改变变宽度
var Resize = {
	lineMove: false,
	mdLineMove: false,
	target: null,

	leftNotebook: $("#leftNotebook"),
	notebookSplitter: $("#notebookSplitter"),
	noteList: $("#noteList"),
	noteAndEditor: $("#noteAndEditor"),
	noteSplitter: $("#noteSplitter"),
	note: $("#note"),
	body: $("body"),
	leftColumn: $("#left-column"),
	rightColumn: $("#right-column"), // $("#preview-panel"), //
	mdSplitter: $("#mdSplitter2"),

	init: function() {
		var self = this;
		self.initEvent();
	},

	initEvent: function() {
		var self = this;

		// 鼠标点下
		$(".noteSplit").bind("mousedown", function(event) {
			event.preventDefault(); // 防止选择文本
			self.lineMove = true;
			$(this).css("background-color", "#ccc");
			self.target = $(this).attr("id");
			// 防止iframe捕获不了事件
			$("#noteMask").css("z-index", 99999); // .css("background-color", // "#ccc");
		});

		// 鼠标点下
		self.mdSplitter.bind("mousedown", function(event) {
			event.preventDefault(); // 防止选择文本
			if($(this).hasClass('open')) {
				self.mdLineMove = true;
			}
			// $(this).css("background-color", "#ccc");
		});

		// 鼠标移动时
		self.body.bind("mousemove", function(event) {
			if(self.lineMove) { // 如果没有这个if会导致不能选择文本
				event.preventDefault();
				self.resize3Columns(event);
			} else if(self.mdLineMove) {
				event.preventDefault();
				self.resizeMdColumns(event);
			}
		});

		// 鼠标放开, 结束
		self.body.bind("mouseup", function(event) {
			self.stopResize();
			// 取消遮罩
			$("#noteMask").css("z-index", -1);
		});

		// 瞬间
		var everLeftWidth;
		$('.layout-toggler-preview').click(function() {
			var $t = $(this);
			var $p = self.leftColumn.parent();
			// 是开的
			if($t.hasClass('open')) {
				var totalWidth = $p.width();
				var minRightWidth = 22;
				var leftWidth = totalWidth - minRightWidth;
				everLeftWidth = self.leftColumn.width();
				self.leftColumn.width(leftWidth);
				self.rightColumn.css('left', 'auto').width(minRightWidth);

				// 禁止split
				$t.removeClass('open');//.addClass('close');
				self.rightColumn.find('.layout-resizer').removeClass('open');
				$('.preview-container').hide();
			} else {
				$t.addClass('open');
				self.rightColumn.find('.layout-resizer').addClass('open');
				self.leftColumn.width(everLeftWidth);
				$('.preview-container').show();
				self.rightColumn.css('left', everLeftWidth).width('auto');

				if(MD) {
					MD.onResize();
				}
			}
		});
	},
	// 停止, 保存数据
	stopResize: function() {
		var self = this;
		if(self.lineMove || self.mdLineMove) {
			// ajax保存
			UserService.updateG({
				MdEditorWidth: UserInfo.MdEditorWidth,
				MdEditorWidthForWritting: UserInfo.MdEditorWidthForWritting,
				NotebookWidth: UserInfo.NotebookWidth,
				NoteListWidth: UserInfo.NoteListWidth
			}, function() {
				// alert(UserInfo.NotebookWidth);
			});
		}
		self.lineMove = false;
		self.mdLineMove = false;
		$(".noteSplit").css("background", "none");
		self.mdSplitter.css("background", "none");
	},

	// 最终调用该方法
	set3ColumnsWidth: function(notebookWidth, noteListWidth) {
		var self = this;

		if(notebookWidth < 150 || noteListWidth < 100) {
			return;
		}
		var noteWidth = self.body.width() - notebookWidth - noteListWidth;
		if(noteWidth < 400) {
			return;
		}

		self.leftNotebook.width(notebookWidth);
		self.notebookSplitter.css("left", notebookWidth);

		self.noteAndEditor.css("left", notebookWidth);
		self.noteList.width(noteListWidth);
		self.noteSplitter.css("left", noteListWidth);
		self.note.css("left", noteListWidth + 2);

		UserInfo.NotebookWidth = notebookWidth;
		UserInfo.NoteListWidth = noteListWidth;

		// console.log("??????????");
		self.setTopDragWidth();
	},
	resize3Columns: function(event, isFromeIfr) {
		var self = this;
		if (isFromeIfr) {
			event.clientX += self.body.width() - self.note.width();
		}

		var notebookWidth, noteListWidth;
		if(self.lineMove) {
			if (self.target == "notebookSplitter") {
				notebookWidth = event.clientX;
				noteListWidth = self.noteList.width();
				self.set3ColumnsWidth(notebookWidth, noteListWidth);
			} else {
				notebookWidth = self.leftNotebook.width();
				noteListWidth = event.clientX - notebookWidth;
				self.set3ColumnsWidth(notebookWidth, noteListWidth);
			}

			resizeEditor();
		}
	},

	// mdeditor
	resizeMdColumns: function(event) {
		var self = this;
		if (self.mdLineMove) {
			var mdEditorWidth = event.clientX - self.leftColumn.offset().left; // self.leftNotebook.width() - self.noteList.width();
			self.setMdColumnWidth(mdEditorWidth);
		}
	},

	// 设置宽度
	setMdColumnWidth: function(mdEditorWidth) {
		var self = this;
		if(mdEditorWidth > 100) {
			if(Writting.isWriting()) {
				UserInfo.MdEditorWidthForWritting = mdEditorWidth;
			} else {
				UserInfo.MdEditorWidth = mdEditorWidth;
			}

			// log(mdEditorWidth)
			self.leftColumn.width(mdEditorWidth);
			self.rightColumn.css("left", mdEditorWidth);
			// self.mdSplitter.css("left", mdEditorWidth);
		}

		// 这样, scrollPreview 才会到正确的位置
		if(MD) {
			MD.onResize();
		}
	},

	// 左+中
	// 在atom中, 尽管title和tool的index比topDrag大也没用, 导致不能点击tool, 不能选择title
	setTopDragWidth: function() {
		if(!isMac()) {
			return;
		}
		var self = this;
		var width = UserInfo.NotebookWidth + UserInfo.noteListWidth;
		if(isNaN(width)) {
			width = self.leftNotebook.width() + self.noteList.width();
		}

		// 60是最左的关闭, 50是新建
		$('#topDrag').width((width - 60 - 50) + 'px');
	}
};
Mobile = {
	noteO: $("#note"),
	bodyO: $("body"),
	setMenuO: $("#setMenu"),
	hashChange: function() {
	},
	changeNote: function(noteId) {
	},

	toEditor: function(changeHash, noteId) {
		var self = this;
		self.noteO.addClass("editor-show");

	},
	toNormal: function(changeHash) {

	},
	switchPage: function() {
	}
};
function initSlimScroll() {
	return;
}
function initEditor() {
	var mceToobarEverHeight = 0;
	$("#moreBtn").click(function() {
		var $editor = $('#editor');
		} else {
			$editor.addClass('all-tool');
		}
		return;
		var height = $("#mceToolbar").height();

		// 现在是折叠的
		if (height < $("#popularToolbar").height()) {
			$(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
			mceToobarEverHeight = height;
		} else {
			$(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
		}

		restoreBookmark();
	});
	tinymce.init({
		theme: 'leanote',
		setup: function(ed) {
			ed.on('keydown', function(e) {

			});
		},
		// fix TinyMCE Removes site base url
		// skin : "custom",
		plugins : [
				"table directionality textcolor" ], // nonbreaking

		menubar : false,
		block_formats : "Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Paragraph=p",
		  // This option specifies whether data:url images (inline images) should be removed or not from the pasted contents.
		  // Setting this to "true" will allow the pasted images, and setting this to "false" will disallow pasted images.
	});
	window.onbeforeunload = function(e) {
	};
}
// 导航
var random = 1;
function scrollTo(self, tagName, text) {
	var iframe = $("#editorContent"); // .contents();
	if(Writting.isWriting()) {
		iframe = $('#editorContentWrap');
	}
	random++;
	if (target.size() >= i+1) {
		// log(nowTop);
		// log(top);
		// iframe.scrollTop(top);
	}
}
function setLayoutWidth() {
	UserInfo.NotebookWidth = UserInfo.NotebookWidth || $("#notebook").width();
	UserInfo.NoteListWidth = UserInfo.NoteListWidth || $("#noteList").width();
}
$(function() {
	$(".folderHeader").click(function() {
		var body = $(this).next();
	});

	$(".leanoteNav h1").on("click", function(e) {
		var $leanoteNav = $(this).closest('.leanoteNav');
	});
	$("#notebook, #newMyNote, #myProfile, #topNav, #notesAndSort", "#leanoteNavTrigger").bind("selectstart", function(e) {
	});
	function getMaxDropdownHeight(obj) {
		var offset = $(obj).offset();
		var maxHeight = $(document).height()-offset.top;
		maxHeight -= 70;
		if(maxHeight < 0) {
			maxHeight = 0;
		}
		var preHeight = $(obj).find("ul").height();
		return preHeight < maxHeight ? preHeight : maxHeight;
	}

	$('#preview-contents, #editorContent').on('click', 'a', function(e) {
		e.preventDefault();
	});

});
var Pjax = {
	init: function() {
		var me = this;
		// 当history改变时
		window.addEventListener('popstate', function(evt){
			var state = evt.state;
			if(!state) {
				return;
			}
			document.title = state.title || "Untitled";
			log("pop");
			me.changeNotebookAndNote(state.noteId);
		}, false);

		// ie9
		if(!history.pushState) {
			$(window).on("hashchange", function() {
				var noteId = getHash("noteId");;
				if(noteId) {
					me.changeNotebookAndNote(noteId);
				}
			});
		}
	},
	// pjax调用
	// popstate事件发生时, 转换到noteId下, 此时要转换notebookId
	changeNotebookAndNote: function(noteId) {
		var note = Note.getNote(noteId);
		if(!note) {
			return;
		}
		var isShare = note.Perm != undefined;

		var notebookId = note.NotebookId;
		// 如果是在当前notebook下, 就不要转换notebook了
		if(Notebook.curNotebookId == notebookId) {
			// 不push state
			Note.changeNoteForPjax(noteId, false);
			return;
		}

		// 自己的
		if(!isShare) {
			// 先切换到notebook下, 得到notes列表, 再changeNote
			Notebook.changeNotebook(notebookId, function(notes) {
				Note.renderNotes(notes);
				// 不push state
				Note.changeNoteForPjax(noteId, false, true);
			});
		// 共享笔记
		} else {
			Share.changeNotebook(note.UserId, notebookId, function(notes) {
				Note.renderNotes(notes);
				// 不push state
				Note.changeNoteForPjax(noteId, false, true);
			});
		}
	},

	// ajax后调用
	changeNote: function(noteInfo) {
		var me = this;
		// life
		return;
		log("push");
		var noteId = noteInfo.NoteId;
		var title = noteInfo.Title;
		var url = '/note/' + noteId;
		if(location.hash) {
			url += location.hash;
		}
		// 如果支持pushState
		if(history.pushState) {
			var state=({
				url: url,
				noteId: noteId,
				title: title,
			});
			history.pushState(state, title, url);
			document.title = title || 'Untitled';
		// 不支持, 则用hash
		} else {
			setHash("noteId", noteId);
		}
	}
};
$(function() {
});
// aceEditor
LeaAce = {
	_aceId: 0,
	_aceEditors: {},
	isAce: true, // 切换pre, 默认是true
	canAce: function() {

	},
	canAndIsAce: function() {
		return this.canAce() && this.isAce;
	},
	initAce: function(id, val, force) {
		var me = this;
		var $pre = $('#' + id);
		try {
			var aceEditor = ace.edit(id);
			var brush = me.getPreBrush($pre);
			var b = "";
			if(brush) {
				try {
					b = brush.split(':')[1];
				} catch(e) {}
			}
			b = b || "javascript";
			aceEditor.session.setMode("ace/mode/" + b);
			aceEditor.setOption("showInvisibles", false); // 不显示空格, 没用
			aceEditor.setShowInvisibles(false);
			aceEditor.setReadOnly(Note.readOnly);
		} catch(e) {
	},
};
