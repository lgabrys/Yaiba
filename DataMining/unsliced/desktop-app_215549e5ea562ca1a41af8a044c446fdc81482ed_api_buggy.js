var db = require('db');
var async = require('async');
var User = require('user');
var Note = require('note');
var Tag = require('tag');
var Notebook = require('notebook');
var Common = require('common');
var Web = require('web');
var Tags = db.tags;
var needle = require('needle');
var fs = require('fs');
var Evt = require('evt');

function log(o) {
	// console.log(o);
}
// log(Common);
// log(db);
// log("??")

// timeout 0无限等待, 60,000 1分钟
needle.defaults({
	timeout: 60000,
	rejectUnauthorized: false
});

// 远程数据服务
var Api = {
	// 检查错误
	checkError: function(error, resp) { 
		var me = this;
		var unConnected = me.unConnected(error);
		// console.error(error);
		// 是否需要重新登录
		/*{
		  "Ok": false,
		  "Code": 1,
		  "Msg": "NOTLOGIN",
		  "Id": "",
		  "List": null,
		  "Item": null
		}*/
		try {
			var ret = resp.body;
			if(typeof ret == 'object') {
				if(!ret['Ok'] && ret['Msg'] == 'NOTLOGIN') {
					Web.notLogin();
					return;
				}
				if(!ret['Ok'] && ret['Msg'] == 'NEED-UPGRADE-ACCOUNT') {
					Web.needUpgradeAccount();
					return;
				}
			} else {
				// 出现问题
				Web.unConnected();
				return;
			}
		} catch(e) {
			// 出错问题
			Web.unConnected();
			return;
		}

		// 没有断网
		!unConnected && Web.connected();
	},
	// 是否断网
	unConnected: function(error) {
		var me = this;
		if(error && (error.code == "ECONNREFUSED" || error.code == 'ECONNRESET')) { // socket hand up
			// console.error('---------------------')
			console.error(error);
			Web.unConnected();
			return true;
		}
		return false;
	},
	getUrl: function(url, param) {
		var url = Evt.leanoteUrl + '/api/' + url;
		// leanote ssl不能非法
		if (url.indexOf('https://leanote.com') == 0) {
			needle.defaults({
				timeout: 60000,
				rejectUnauthorized: true
			});
		} else {
			needle.defaults({
				timeout: 60000,
				rejectUnauthorized: false
			});
		}
		var token = User.getToken();
		param = param || {};
		param.token = token;
		if(param) {
			var paramStr = '';
			for(var i in param) {
				paramStr += i + '=' + param[i] + '&';
			}
		}
		if(url.indexOf('?') >= 0) {
			url =  url + '&' + paramStr;
		}
		url =  url + '?' + paramStr;
		return url;
	},
	// 登录
	auth: function(email, pwd, host, callback) { 
		var me = this;

		// 设置server host
		Evt.setHost(host);

		// log({emai: email, pwd: pwd});
		// console.log(this.getUrl('auth/login', {email: email, pwd: pwd}));
		// console.log('????????????')
		needle.post(this.getUrl('auth/login'), {email: email, pwd: pwd}, {timeout: 10000}, function(error, response) {
			me.checkError(error, response);
			if(error) {
				return callback && callback(false);
			}
			
			// needle.get('http://localhost/phpinfo.php?email=xx', {emai: email, pwd: pwd}, function(error, response) {
			var ret = response.body;
			// 登录成功, 保存token
			// console.log('login ret');
			// console.log(ret);
			if(Common.isOk(ret)) {
				ret.Pwd = Common.md5(pwd, ret.UserId);
				ret['Host'] = Evt.leanoteUrl;
				// User.setCurUser(ret);
				callback && callback(ret);
			} else {
				// console.log('log failed');
				callback && callback(false);
			}
		});
	},

	logout: function (callback) {
		needle.post(this.getUrl('auth/logout'), {timeout: 10000}, function(error, response) {
			callback();
		});
	},

	getSyncNotebooks: function(afterUsn, maxEntry, callback) {
		var me = this;
		var url = this.getUrl('notebook/getSyncNotebooks', {afterUsn: afterUsn, maxEntry: maxEntry});
		// console.log(url);
		needle.get(url, 
				function(error, response) {
			me.checkError(error, response);
			if(error) {
				console.log(error);
				return callback && callback(false);
			}
			var ret = response.body;
			// console.log(ret);
			// console.log(response);
			if(Common.isOk(ret)) {
				callback && callback(ret);
			} else {
				callback && callback(false);
			}
		});	
	},
	getSyncNotes: function(afterUsn, maxEntry, callback) {
		var me = this;
		var url = this.getUrl('note/getSyncNotes', {afterUsn: afterUsn, maxEntry: maxEntry});
		log(url);
		needle.get(url, function(error, response) {
			me.checkError(error, response);
			if(error) {
				console.log('note/getSyncNotes');
				console.log(error);
				return callback && callback(false);
			}
			var ret = response.body;
			if(Common.isOk(ret)) {
				callback && callback(ret);
			} else {
				callback && callback(false);
			}
		});	
	},
	getSyncTags: function(afterUsn, maxEntry, callback) {
		var me = this;
		var url = this.getUrl('tag/getSyncTags', {afterUsn: afterUsn, maxEntry: maxEntry});
		log(url);
		needle.get(url, function(error, response) {
			me.checkError(error, response);
			if(error) {
				console.log('tag/getSyncTags');
				console.log(error);
				return callback && callback(false);
			}
			var ret = response.body;
			// console.log(ret);
			if(Common.isOk(ret)) {
				callback && callback(ret);
			} else {
				callback && callback(false);
			}
		});	
	},
	getLastSyncState: function(callback) {
		var me = this;
		var url = this.getUrl('user/getSyncState');
		// console.log(url);
		needle.get(url, {timeout: 10000}, function(error, response) {
			// console.log('user/getSyncState ret');
			me.checkError(error, response);
			if(error) {
				return callback && callback(false);
			}
			var ret = response.body;
			callback && callback(ret);
		});	
	},
	// 获取笔记内容, 获取之后保存到笔记中
	getNoteContent: function(noteId, callback) {
		var me = this;
		var url = this.getUrl('note/getNoteContent', {noteId: noteId});
		console.log('	get note content from server...', noteId);
		// console.log(url);
		needle.get(url, function(error, response) {
			me.checkError(error, response);
			if(error) {
				log(error);
				return callback && callback(false);
			}
			var ret = response.body;
			if(Common.isOk(ret)) { // {Content: 'xx', NoteId: 'xxx'}
				callback && callback(ret);
			} else {
				callback && callback(false);
			}
		});	
	},

	// TODO
	// get图片, 获取内容后, 得到所有图片链接, 异步去获取图片, 并修改图片链接, 
	// 将https://leanote.com/api/resource/getImage?imageId=xx
	// 转成app://leanote/public/files, 内部可以是个服务器吗? 请求内部的controller
	getImage: function(fileId, callback) {
		var me = this;
		var url = me.getUrl('file/getImage', {fileId: fileId});

		// console.log('getImage');
		// console.log(url);

		needle.get(url, function(err, resp) {
			me.checkError(err, resp);
			if(err) {
				return callback && callback(false);
			}
			else if (resp.statusCode != 200) {
				console.log(fileId + ' 图片返回状态错误: ' + resp.statusCode);
				return callback && callback(false);
			}

			// log(resp);
			/*
			{ 'accept-ranges': 'bytes',
			  'content-disposition': 'inline; filename="logo.png"',
			  'content-length': '8583',
			  'content-type': 'image/png',
			  date: 'Mon, 19 Jan 2015 15:01:47 GMT',
  			*/
			// log(resp.headers);
			else {
				var typeStr = ('' + resp.headers['content-type']).toLowerCase();

				if (typeStr.indexOf('image') < 0) {
					console.log(fileId + ' 不是图片');
					return callback && callback(false);
				}

				var type = 'png';
				if(typeStr) {
					var typeArr = typeStr.split('/');
					if(typeStr.length > 1) {
						type = typeArr[1];
					}
				}

				var filename = Common.uuid() + '.' + type;
				var imagePath = User.getCurUserImagesPath();
				var imagePathAll = imagePath + '/' + filename;
				fs.writeFile(imagePathAll, resp.body, function(err) {
					if(err) {
						log(err);
						log('local save image failed 本地保存失败');
						callback(false);
					} else {
						console.log('main save image success');
						callback(imagePathAll, filename);
					}
				});
			}
		});
	},

	// 获取附件
	// FileService调用
	getAttach: function(serverFileId, callback) {
		var me = this;
		var url = me.getUrl('file/getAttach', {fileId: serverFileId});
		console.log(url);
		needle.get(url, function(err, resp) {
			me.checkError(err, resp);
			if(err) {
				return callback && callback(false);
			}
			// log(resp.body);
			/*
			{ 'accept-ranges': 'bytes',
			  'content-disposition': 'inline; filename="logo.png"',
			  'content-length': '8583',
			  'content-type': 'image/png', ""
			  date: 'Mon, 19 Jan 2015 15:01:47 GMT',

			  'accept-ranges': 'bytes',
			  'content-disposition': 'attachment; filename="box.js"',
			  'content-length': '45503',
			  'content-type': 'application/javascript',
  			*/
			// console.log(resp.headers);
			// return;
			if(err) {
				callback(false);
			} else {
				// TODO 这里, 要知道文件类型
				var typeStr = resp.headers['content-type'];
				var contentDisposition = resp.headers['content-disposition'];
				var matches = contentDisposition.match(/filename="(.+?)"/);
				var filename = matches && matches.length == 2 ? matches[1] : "";
				// log(resp.headers);
				// log(typeStr);
				var type = '';
				if(filename) {
					type = filename.split('.').pop();
				}
				if(!filename && typeStr) {
					var typeArr = typeStr.split('/');
					if(typeStr.length > 1) {
						type = typeArr[1];
					}
				}

				var filename = Common.uuid() + '.' + type;
				var attachPath = User.getCurUserAttachsPath();
				var attachPathAll = attachPath + '/' + filename;
				log(attachPathAll);
				fs.writeFile(attachPathAll, resp.body, function(err) {
					if(err) {
						log(err);
						log('local save attach failed 本地保存失败');
						callback(false);
					} else {
						callback(true, attachPathAll, filename);
					}
				});
			}
		});
	},

	//------------
	// 笔记本操作
	//------------
	// 添加
	addNotebook: function(notebook, callback) {
		var me = this;
		// notebook.ParentNotebookId是本的, 要得到远程的
		Notebook.getServerNotebookIdByNotebookId(notebook.ParentNotebookId, function(serverNotebookId) {
			var data = {
				title: notebook.Title,
				seq: notebook.Seq,
				parentNotebookId: serverNotebookId
			}
			console.log('add notebook');
			console.log(data, me.getUrl('notebook/addNotebook'));
			needle.post(me.getUrl('notebook/addNotebook'), data, {}, function(err, resp) {
				me.checkError(err, resp);
				if(err) {
					return callback(false);
				}
				var ret = resp.body;
				console.log(ret);
				if(Common.isOk(ret)) {
					callback(ret);
				} else {
					callback(false);
				}
			});	
		});
	},
	// 更新
	updateNotebook: function(notebook, callback) {
		var me = this;
		Notebook.getServerNotebookIdByNotebookId(notebook.ParentNotebookId, function(serverNotebookId) {
			var data = {
				notebookId: notebook.ServerNotebookId,
				title: notebook.Title,
				usn: notebook.Usn,
				seq: notebook.Seq,
				parentNotebookId: serverNotebookId || ""
			}
			log('update notebook');
			log(data);
			needle.post(me.getUrl('notebook/updateNotebook'), data, {}, function(err, resp) {
				me.checkError(err, resp);
				if(err) {
					log('err');
					log(err);
					return callback(false);
				}
				var ret = resp.body;
				log('update notebook ret:');
				log(ret);
				if(Common.isOk(ret)) {
					callback(ret);
				} else {
					callback(false);
				}
			});
		});
	},

	// 删除
	deleteNotebook: function(notebook, callback) {
		var me = this;
		var data = {notebookId: notebook.ServerNotebookId, usn: notebook.Usn};
		log('delete notebook');
		needle.post(me.getUrl('notebook/deleteNotebook'), data, {timeout: 10000}, function(err, resp) {
			me.checkError(err, resp);
			if(err) {
				return callback(false);
			}
			var ret = resp.body;
			log('delete notebook ret');
			log(ret);
			if(Common.isOk(ret)) {
				// 以后不要再发了
				Notebook.setNotDirty(notebook.NotebookId);
				callback(ret);
			} else {
				callback(false);
				try {
					log('delete notebook conflict');
					// 代表冲突了, 那么本地的删除无效, 设为IsDirty为false, 不删除
					// 待以后同步
					if(ret.Msg == 'conflict') {
						log('delete notebook conflict: setNotDirtyNotDelete');
						Notebook.setNotDirtyNotDelete(notebook.NotebookId);
					} else {
						log('delete notebook conflict: setNotDirty');
						Notebook.setNotDirty(notebook.NotebookId);
					}

				} catch(e) {}
			}
		});
	},

	//---------
	// note
	//--------

	// 获取笔记
	// noteId是serverNoteId
	getNote: function(noteId, callback) {
		var me = this;
		needle.get(me.getUrl('note/getNote', {noteId: noteId}), function(error, response) {
			me.checkError(error, response);
			if(error) {
				return callback && callback(false);
			}
			var ret = response.body;
			if(Common.isOk(ret)) {
				callback && callback(ret);
			} else {
				console.error(error);
				console.log(me.getUrl('note/getNote', {noteId: noteId}));
				callback && callback(false);
			}
		});
	},

	// 添加笔记
	// 要把文件也发送过去
	addNote: function(note, callback) {
		var me = this;
		// note.NotebookId是本的, 要得到远程的
		Notebook.getServerNotebookIdByNotebookId(note.NotebookId, function(serverNotebookId) {
			if(!serverNotebookId) {
				callback && callback('No serverNotebookId');
				return;
			}
			console.log('serverNotebookId', serverNotebookId)
			var data = {
				Title: note.Title,
				NotebookId: serverNotebookId,
				Content: note.Content,
				IsMarkdown: note.IsMarkdown,
				Tags: note.Tags,
				// IsBlog: false, // TODO 这里永远设为非blog note.IsBlog,
				IsBlog: note.IsBlog,
				Files: note.Files,
				FileDatas: note.FileDatas,
				CreatedTime: Common.formatDatetime(note.CreatedTime),
				UpdatedTime: Common.formatDatetime(note.UpdatedTime)
			}

			// files处理
			var needMultiple = false;
			for(var i in data.FileDatas) {
				needMultiple = true;
				break;
			}

			// 最终传递的数据
			console.log('	end transfer data', data, me.getUrl('note/addNote'));

			try {
				needle.post(me.getUrl('note/addNote'), data, 
					{
						multipart: needMultiple
					}, 
					function(err, resp) {
						me.checkError(err, resp);
						if(err) {
							return callback(err);
						}
						var ret = resp.body;
						console.log('	add note ret', ret);
						if(Common.isOk(ret)) {
							// 将serverId保存
							callback(null, ret);
						} else {
							callback(ret);
						}
					});
			} catch(e) {
				console.log('	add note needle error', e);
			};
		});
	},

	// 更新
	updateNote: function(note, callback) {
		var me = this;
		Notebook.getServerNotebookIdByNotebookId(note.NotebookId, function(serverNotebookId) {
			if(!note.Tags || note.Tags.length == 0) {
				note.Tags = [''];
			}
			var data = {
				NoteId: note.ServerNoteId,
				NotebookId: serverNotebookId || "",
				Title: note.Title,
				Usn: note.Usn,
				IsTrash: note.IsTrash,
				IsBlog: note.IsBlog, // 是否是博客
				Files: note.Files,
				FileDatas: note.FileDatas,
				Tags: note.Tags, // 新添加,
				UpdatedTime: Common.formatDatetime(note.UpdatedTime)
			};

			// 内容不一样才发内容
			if(note.ContentIsDirty) {
				data.Content = note.Content;

				// 如果是markdown笔记, 则摘要也要传过去
				if(note.IsMarkdown) {
					data.Abstract = note.Abstract;
				}
			}

			// console.log('update note :');

			// files处理
			var needMultiple = false;
			for(var i in data.FileDatas) {
				needMultiple = true;
				break;
			}


			// for test
			// data.FileDatas = null;

			needle.post(me.getUrl('note/updateNote'), data, {multipart: needMultiple}, function(err, resp) {
				// console.log('update note ret------------------');
				me.checkError(err, resp);
				if(err) {
					// console.error('err');
					// console.log(err);
					return callback(err);
				}
				var ret = resp.body;
				// console.log('update note ret:');
				// console.log(ret);
				// console.log(ret.Files);
				// 没有传IsMarkdown, 后台会传过来总为false
				delete ret['IsMarkdown'];
				callback(null, ret);
				/*
				if(Common.isOk(ret)) {
				} else {
					callback(false);
				}
				*/
			});
		});
	},

	// 删除
	deleteTrash: function(note, callback) {
		var me = this;
		var data = {noteId: note.ServerNoteId, usn: note.Usn};
		log('delete note');
		// 这里要重新require下, 不然为{}
		Note = require('note');
		needle.post(me.getUrl('note/deleteTrash'), data, {timeout: 10000}, function(err, resp) {
			me.checkError(err, resp);
			if(err) {
				return callback(false);
			}
			var ret = resp.body;
			console.error('delete note ret');
			console.log('delete note ret');
			console.log(ret);
			if(Common.isOk(ret)) {
				// 以后不要再发了
				Note.removeNote(note.NoteId);
				callback(ret);
			} else {
				callback(false);
				try {
					console.log('delete note conflict');
					// 代表冲突了, 那么本地的删除无效, 设为IsDirty为false, 不删除
					// 待以后同步
					if(ret.Msg == 'conflict') {
						console.log('delete note conflict: setNotDirtyNotDelete');
						Note.setNotDirtyNotDelete(note.NoteId);
					} else if(ret.Msg == 'notExists') {
						console.log('delete note conflict: remove not exists');
						Note.removeNote(note.NoteId);
					} else {
						console.log('delete note conflict: setNotDirty');
						Note.setNotDirty(note.NoteId);
					}
				} catch(e) {}
			}
		});
	},

	exportPdf: function(noteId, callback) {
		var me = this;
		// console.log(me.getUrl('note/exportPdf', {noteId: noteId}));
		needle.get(me.getUrl('note/exportPdf', {noteId: noteId}), function(err, resp) {
			me.checkError(err, resp);
			if(err) {
				return callback && callback(false);
			}
			// log(resp.body);
			/*
			{ 'accept-ranges': 'bytes',
			  'content-disposition': 'inline; filename="logo.png"',
			  'content-length': '8583',
			  'content-type': 'image/png',
			  date: 'Mon, 19 Jan 2015 15:01:47 GMT',
  			*/
 
  			var body = resp.body;
  			if(typeof body == "object" && body.Msg === false) {
  				return callback(false, "", body.Msg);
  			}
			
			var filename = Common.uuid() + '.pdf';
			var imagePath = User.getCurUserImagesPath();
			var imagePathAll = imagePath + '/' + filename;
			fs.writeFile(imagePathAll, resp.body, function(err) {
				if(err) {
					// log(err);
					// log('local save pdf failed 本地保存失败');
					callback(false);
				} else {
					callback(imagePathAll, filename);
				}
			});
		});
	},

	// 添加标签
	addTag: function(title, callback) {
		var me = this;
		needle.post(me.getUrl('tag/addTag'), {tag: title}, {}, function(err, resp) {
			me.checkError(err, resp);
			if(err) {
				return callback && callback(false);
			}
			var ret = resp.body;
			console.log('	add tag ret: ', ret);
			if(Common.isOk(ret)) {
				
				callback && callback(ret);
			} else {
				callback && callback(false);
			}
		});
	},
	// 删除标签
	deleteTag: function(tag, callback) {
		var me = this;
		needle.post(me.getUrl('tag/deleteTag'), {tag: tag.Tag, usn: tag.Usn}, {timeout: 10000}, function(err, resp) {
			me.checkError(err, resp);
			if(err) {
				return callback && callback(false);
			}
			var ret = resp.body;
			console.log('	delete tag ret:', ret);
			callback && callback(ret);
		});
	},

	//---------------
	// just for fun

	test: function() {
		log("??");
		Note = require('note');
		log(Note);
	},

	post: function() {
		var me = this;
		var options = {
			headers: { 'X-Custom-Header': 'Bumbaway atuna' }
		}
		// you can pass params as a string or as an object.
		needle.post(me.getUrl('auth/login'), 'foo=bar', options, function(err, resp) {
			var ret = resp.body;
			log(ret);
		});	
	},
	// get图片
	getImageTest: function(callback) {
		needle.get('http://localhost:9000/images/logo.png', function(err, resp) {
			// log(resp.body);
			/*
			{ 'accept-ranges': 'bytes',
			  'content-disposition': 'inline; filename="logo.png"',
			  'content-length': '8583',
			  'content-type': 'image/png',
			  date: 'Mon, 19 Jan 2015 15:01:47 GMT',
  			*/
			// log(resp.headers);
			fs.writeFile('/Users/life/Desktop/aa.png', resp.body);
		});
	},
	// 测试
	uploadImage: function() {
		var data = {
			foo: 'bar',
			cc: [1,2,3,3],
			dd: {name: 'life', age: 18},
			image: { file: '/Users/life/Desktop/imageplus.png', content_type: 'image/png' }
		}
		needle.post('http://localhost/phpinfo.php', data, { multipart: true }, function(err, resp, body) {
			// needle will read the file and include it in the form-data as binary
			console.log(resp.body);
		});
	}

};
module.exports = Api;
