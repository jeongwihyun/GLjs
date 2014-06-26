(function( window ){

	var document = window.document,
	navigator = window.navigator,
	location = window.location;
	
	//======================================================================================
	// load css file (START) ===============================================================
	//======================================================================================
	//var GL_CSS=document.createElement('link');
	//GL_CSS.setAttribute('rel', 'stylesheet');
	//GL_CSS.setAttribute('id', '___GL_Dashboard_common_css');
	//GL_CSS.setAttribute('href', './_GLDashboard/assets/css/common.css');
	//document.getElementsByTagName('head')[0].insertBefore(GL_CSS, document.getElementsByTagName('head')[0].firstChild);
	//======================================================================================
	// load css file (END) =================================================================
	//======================================================================================
	
	//======================================================================================
	// load script file (START) ============================================================
	//======================================================================================
	//var script1=document.createElement('script');
	//script1.setAttribute('type', 'text/javascript');
	//script1.setAttribute('src', './js/lib/glgrid/GLGrid.js');
	//document.getElementsByTagName('head')[0].appendChild(script1);
	//======================================================================================
	// load script file (END) ==============================================================
	//======================================================================================
	
	
	var GL = (function($, undefined){
		var _GL = function(){
			// property----------------
			this.property = 'call property';
		};
		
		// add literal function and variable (START) ============================================
		_GL.baseUrl 		= 'http://upton.glchart.com';
		_GL.WebSocketUrl	= '';
		_GL.ws_connection	= null;
		_GL._layout_default_config = {
			frame: {
				header: { on:false, height:'48px' }
				,footer: { on:false, height: '48px' }
				,leftSideArea: { on:false, width: '210px' }
				,rightSideArea: { on:false, width: '210px' }
			}
			,header: {
				
			}
			,footer: {
				
			}
			,l_side: {}
			,center: {}
			,r_side: {}
		};
		_GL.extend = function(a, b){
			var spp = a.prototype;
			for (var property in b){
			   spp[property] = b[property];
			}   
			return a;
		};
		_GL.ready = function(callback){
			if($){
				$( document ).ready( function(){callback();} );
			}else{
				window.onload = function(){callback();};
			}
		};
		_GL.unload = function(callback){
			if($){
				$( window ).unload( function(){callback();} );
			}else{
				window.unload = function(){callback();};
			}
		};
		_GL.ajax = function(obj, sFn, eFn){
			
			var _url		= obj.url || '';
			var _type		= obj.type || 'GET';
			var _dataType	= obj.dataType || 'text';
			var _data		= obj.data || {};
			var _async		= obj.async || true;
			var _contentType= obj.contentType || 'text/plain; charset=UTF-8';
			
			var request = $.ajax({
				headers: { 
					Accept : "*/*",
					//"Content-Type": "text/plain"
					"Content-Type": "application/json"
				}
				,url:		_url
				,type:		_type
				,data:		_data
				,dataType:	_dataType
				,async:		_async
				,contentType: _contentType
			});
			request.done(function( msg ) {
				sFn(msg);
			});
			request.fail(function( jqXHR, textStatus ) {
				sFn(textStatus);
			});
			
		};
		_GL.userAgent = function(){
		
			var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);
			if(trident != null && trident[1] == "5.0"){
				return 9;
			}else if(trident != null && trident[1] == "6.0"){
				return 10;
			}else if(trident != null && trident[1] == "4.0"){
				return 8;
			}else{
				var agt = navigator.userAgent.toLowerCase();
				if (agt.indexOf("chrome") != -1) return 'Chrome'; 
				if (agt.indexOf("opera") != -1) return 'Opera'; 
				if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
				if (agt.indexOf("webtv") != -1) return 'WebTV'; 
				if (agt.indexOf("beonex") != -1) return 'Beonex'; 
				if (agt.indexOf("chimera") != -1) return 'Chimera'; 
				if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
				if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
				if (agt.indexOf("firefox") != -1) return 'Firefox'; 
				if (agt.indexOf("safari") != -1) return 'Safari'; 
				if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
				if (agt.indexOf("msie") != -1) return 'Internet Explorer'; 
				if (agt.indexOf("netscape") != -1) return 'Netscape'; 
				if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla'; 
				
				return null;
			}

		};
		_GL.detectMobile = function(){ 
			if( navigator.userAgent.match(/Android/i)
			 || navigator.userAgent.match(/webOS/i)
			 || navigator.userAgent.match(/iPhone/i)
			 || navigator.userAgent.match(/iPad/i)
			 || navigator.userAgent.match(/iPod/i)
			 || navigator.userAgent.match(/BlackBerry/i)
			 || navigator.userAgent.match(/Windows Phone/i)
			){
				return true;
			}else{
				return false;
			}
		};
		_GL.replaceAll = function(str, searchStr, replaceStr){
			while (str.indexOf(searchStr) != -1) {
				str = str.replace(searchStr, replaceStr);
			}
			return str;
		};
		_GL.changeTheme = function( type ){
			if(type=='light'){
				var glCss = document.getElementById('___GL_Dashboard_common_css');
				var url = glCss.getAttribute('GL-RootUrl');
				if(glCss) { glCss.href=( url+'assets/css/common.css' ); }
			}else if(type=='dark-gray'){
				var glCss = document.getElementById('___GL_Dashboard_common_css');
				var url = glCss.getAttribute('GL-RootUrl');
				if(glCss) { glCss.href=( url+'assets/css/common_dark-gray.css' ); }
			}
		};
		_GL.PageTransitions = (function($) {
		  var startElement = 0,
		  animEndEventNames = {
			'WebkitAnimation': 'webkitAnimationEnd',
			'OAnimation': 'oAnimationEnd',
			'msAnimation': 'MSAnimationEnd',
			'animation': 'animationend'
		  }

		  function getTransitionPrefix() {
			var b = document.body || document.documentElement;
			var s = b.style;
			var p = 'animation';
			if(typeof s[p] == 'string')
			  return 'animation';

			// Tests for vendor specific prop
			v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
			p = p.charAt(0).toUpperCase() + p.substr(1);
			for( var i=0; i<v.length; i++ ) {
			  if(typeof s[v[i] + p] == 'string')
				return v[i] + p;
			}
			return false;
		  }
		  // animation end event name
		  animEndEventName = animEndEventNames[getTransitionPrefix()];

		  function init() {
			$(".GL-et-page").each(function() {
			  $(this).data('originalClassList', $(this).attr('class'));
			});
			$(".GL-et-wrapper").each(function() {
			  $(this).data('current', 0);
			  $(this).data('isAnimating', false);
			  $(this).children(".GL-et-page").eq(startElement).addClass('GL-et-page-current');
			});
			/*
			$(".GL-et-page-transitions").click(function() {
			  event.preventDefault();
			  animate($('.GL-et-wrapper'));
			});
			*/
		  }

		  function animate(block, callback) {
			nextPage($(block).closest('.GL-et-wrapper'), $(block).attr('GL-et-out'), $(block).attr('GL-et-in'), callback);
		  }

		  function nextPage(block, outClass, inClass, callback) {
			block = $(block);
			inClass = formatClass(inClass);
			outClass = formatClass(outClass);
			var current = block.data('current'),
				$pages = block.children('.GL-et-page'),
				pagesCount = $pages.length,
				endCurrPage = false,
				endNextPage = false;

			if(block.data('isAnimating')) {
			  return false;
			}

			block.data('isAnimating', true);

			var $currPage = $pages.eq(current);
			if(current < pagesCount - 1) {
			  current++;
			}
			else {
			  current = 0;
			}
			block.data('current', current);

			var $nextPage = $pages.eq(current).addClass('GL-et-page-current');

			$currPage.addClass(outClass).on(animEndEventName, function() {
			  $currPage.off(animEndEventName);
			  endCurrPage = true;
			  if(endNextPage) {
				if(jQuery.isFunction(callback)) {
				  callback(block, $nextPage, $currPage);
				}
				onEndAnimation($currPage, $nextPage, block);
			  }
			});

			$nextPage.addClass(inClass).on(animEndEventName, function() {
			  $nextPage.off(animEndEventName);
			  endNextPage = true;
			  if(endCurrPage) {
				onEndAnimation($currPage, $nextPage, block);
			  }
			});
		  }

		  function onEndAnimation($outpage, $inpage, block) {
			resetPage($outpage, $inpage);
			block.data('isAnimating', false);
		  }

		  function resetPage($outpage, $inpage) {
			$outpage.attr('class', $outpage.data( 'originalClassList'));
			$inpage.attr('class', $inpage.data( 'originalClassList') + ' GL-et-page-current');
		  }

		  function formatClass(str) {
			classes = str.split(" ");
			output = "";
			for(var n=0; n<classes.length; n++){
			  output += " GLPT-page-" + classes[n];
			}
			return output;
		  }
		  return {
			init : init,
			nextPage: nextPage,
			animate: animate
		  };
		})(jQuery);
		_GL.getTemplate = function( url, callback ){
			var _self=this, callback = callback;
			_GL.ajax(
				{url: url}
				,function( data ){
					callback(data);
				}
				,function( data ){
					callback(data);
				}
			);
		};
		_GL.dragHandler = {
			// private property.
			_oElem : null,
		 
			// public method. Attach drag handler to an element.
			attach : function(oElem) {
				oElem.onmousedown = _GL.dragHandler._dragBegin;
		 
				// callbacks
				oElem.dragBegin = new Function();
				oElem.drag = new Function();
				oElem.dragEnd = new Function();
		 
				return oElem;
			},
			// private method. Begin drag process.
			_dragBegin : function(e) {
				var oElem = _GL.dragHandler._oElem = this;
		 
				if (isNaN(parseInt(oElem.style.left))) { oElem.style.left = '0px'; }
				if (isNaN(parseInt(oElem.style.top))) { oElem.style.top = '0px'; }
		 
				var x = parseInt(oElem.style.left);
				var y = parseInt(oElem.style.top);
		 
				e = e ? e : window.event;
				oElem.mouseX = e.clientX;
				oElem.mouseY = e.clientY;
		 
				oElem.dragBegin(oElem, x, y);
		 
				document.onmousemove = _GL.dragHandler._drag;
				document.onmouseup = _GL.dragHandler._dragEnd;
				return false;
			},
			// private method. Drag (move) element.
			_drag : function(e) {
				var oElem = _GL.dragHandler._oElem;
		 
				var x = parseInt(oElem.style.left);
				var y = parseInt(oElem.style.top);
		 
				e = e ? e : window.event;
				oElem.style.left = x + (e.clientX - oElem.mouseX) + 'px';
				oElem.style.top = y + (e.clientY - oElem.mouseY) + 'px';
		 
				oElem.mouseX = e.clientX;
				oElem.mouseY = e.clientY;
		 
				oElem.drag(oElem, x, y);
		 
				return false;
			},
			// private method. Stop drag process.
			_dragEnd : function() {
				var oElem = _GL.dragHandler._oElem;
		 
				var x = parseInt(oElem.style.left);
				var y = parseInt(oElem.style.top);
		 
				oElem.dragEnd(oElem, x, y);
		 
				document.onmousemove = null;
				document.onmouseup = null;
				_GL.dragHandler._oElem = null;
			}
		 
		};
		_GL.addEvent = function( evnt, elem, func ){
			if( !elem ){ return; }
			if(
				GL.userAgent() == '9' ||
				GL.userAgent() == '8' ||
				GL.userAgent() == '7'
			){
				elem.attachEvent("on"+evnt, func);
			}else{
				if(elem.addEventListener){  // W3C DOM
					elem.addEventListener(evnt,func,false);
				}else if(elem.attachEvent){ // IE DOM
					elem.attachEvent("on"+evnt, func);
				}
			}
			
			
		};
		_GL.insertAfter = function(newElement,targetElement) {
			var parent = targetElement.parentNode;
			if(parent.lastchild == targetElement) {
				parent.appendChild(newElement);
			} else {
				parent.insertBefore(newElement, targetElement.nextSibling);
			}
		};
		_GL.hasClass = function(ele,cls) {
			if( ele ){
				return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
			}
		};
		_GL.addClass = function(ele,cls) {
			if( ele ){
				if (!this.hasClass(ele,cls)) ele.className += " "+cls;
			}	
		};
		_GL.removeClass = function(ele,cls) {
			if( ele ){
				if (GL.hasClass(ele,cls)) {
					var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
					ele.className=ele.className.replace(reg,' ');
				}
			}
		};
		_GL.attr = function(ele, name, value){
			if( ele ){
				if( !!ele.getAttribute ){
					if(value){
						ele.setAttribute(name, value);
					}else{
						return ele.getAttribute(name);
					}
				}else{
					if(value){
						ele[name] = value;
					}else{
						return ele.name;
					}
				}
			}
		};
		// add literal function and variable (END) ==============================================
		
		// add prototype function and variable (START) ==========================================
		String.prototype.trim = function(){
			return this.replace(/(^\s*)|(\s*$)/g, "");
		};
		String.prototype.ltrim = function(){
			return this.replace(/(^\s*)/g, "");
		};
		String.prototype.rtrim = function(){
			return this.replace(/(\s*$)/g, "");
		};
		Date.prototype.timeNow = function(){
			return ((this.getHours() < 10)?"0":"") + ((this.getHours()>12)?(this.getHours()-12):this.getHours()) +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds() + ((this.getHours()>12)?('PM'):'AM'); 
		};
		// (querySelectorAll, querySelector) all browsers ==========================
		if(!document.querySelectorAll) {
			// private variable----------------------
			var _GL_style = document.createStyleSheet() || null;
			document.querySelectorAll = function (selector) {
				
				var all = document.all,
					l = all.length,
					i,
					resultSet = [];
	 
				_GL_style.addRule(selector, "foo:bar");
				for (i = 0; i < l; i += 1) {
					if (all[i].currentStyle.foo === "bar") {
						resultSet.push(all[i]);
						if (resultSet.length > Infinity) {
							break;
						}
					}
				}
				_GL_style.removeRule(0);
				return resultSet;
				
			};
		}
		if(!document.querySelector) {
			var _GL_style = document.createStyleSheet() || null;
			document.querySelector = function (selector) {
				
				var all = document.all,l = all.length,i,resultSet = [];
				_GL_style.addRule(selector, "foo:bar");
				for (i = 0; i < l; i += 1) {
					if (all[i].currentStyle.foo === "bar") {
						resultSet.push(all[i]);
						if (resultSet.length > 1) {
							break;
						}
					}
				}
				_GL_style.removeRule(0);
				return (resultSet[0] || null);
				
			};
		}
		// (querySelectorAll, querySelector) all browsers ==========================
		_GL.prototype._applyOptions = function( op, applyO ){
			var oDefault = op || {};
			var e,j,i,o,p,q, r;
			
			if( oDefault.constructor !== Object )
			{  oDefault = {}; }
			 
			if( (e=applyO) != null ){
				for(j in e){
					i = oDefault[j];
					o = e[j];
				
					if( o.constructor == Object ){
						for(p in o){
						
							if( o[p].constructor == Object ){
								for( q in o[p] ){
									try{oDefault[j][p][q] = o[p][q];}catch(ex){oDefault[j][p] = o[p];}
								}
							}else{
								try{oDefault[j][p] = o[p];}catch(ex){oDefault[j] = o;}
							}
						}
					}else{ oDefault[j] = o; }
				}
			}
			
		};
		// add prototype function and variable (END) ============================================
		
		return _GL;
	})( !!jQuery?jQuery:false );
	
	// Implementation of Components (START)=======================================================
	GL.Layout = function(){
		GL.call(this, arguments);
		this._options = {
			container: arguments[0] || null
			,layout: {
				header: { on:false, height:'48px', template:null }
				,footer: { on:false, height: '48px', template:null }
				,leftSideArea: { on:false, width: '210px', template:null }
				,rightSideArea: { on:false, width: '210px', template:null }
				,centerArea: { template:null }
			}
			,theme: {
				layoutStyle: 'light'	// light, dark-gray
			}
		};
		this._htmlTemplateCnt = 0;
		this._doneHtmlTemplateCnt = 0;
		this._done_callback = null;
	};
	GL.Layout.prototype = new GL();
	GL.extend(GL.Layout, {
		show: function(opt){
			var _self = this;
			if( opt ){
				this._applyOptions( this._options, opt );
			}
			
			var sHtml = this._getHTMLContainer();
			var con = document.getElementById(this._options.container);
			con.innerHTML = sHtml;
			
			this._setOptionContainer();
			
			for( var prop in this._options.layout ){
				if( this._options.layout[prop].on || prop == 'centerArea' ){
					if(this._options.layout[prop].template){
						this._htmlTemplateCnt++;
					}
				}
			}
			for( var prop in this._options.layout ){
				if( this._options.layout[prop].on || prop == 'centerArea' ){
					if(this._options.layout[prop].template){
						this._getTemplate( prop, this._options.layout[prop].template );
					}
				}
			}
			
			
		}
		,done: function( callback ){
			this._done_callback = callback;
		}
		,_setOptionContainer: function(){
			
			var opt = this._options;
			
			// header height
			$('.GL-dashboard-page-header').css('height', parseFloat(opt.layout.header.height)+'px');
			$('.GL-dashboard-page-content-wrapper').css('top', parseFloat(opt.layout.header.height)+'px');
			// footer height
			$('.GL-dashboard-page-footer').css('height', parseFloat(opt.layout.footer.height)+'px');
			$('.GL-dashboard-page-content-wrapper').css('bottom', parseFloat(opt.layout.footer.height)+'px');
			// left side width
			$('.GL-dashboard-page-content-left').css('width', parseFloat(opt.layout.leftSideArea.width)+'px');
			$('.GL-dashboard-page-content-center').css('padding-left', parseFloat(opt.layout.leftSideArea.width)+'px');
			// right side width
			$('.GL-dashboard-page-content-right').css('width', parseFloat(opt.layout.rightSideArea.width)+'px');
			$('.GL-dashboard-page-content-center').css('padding-right', parseFloat(opt.layout.rightSideArea.width)+'px');
			
			if( !this._options.layout.header.on ){
				$('.GL-dashboard-page-header-wrapper').hide();
				$('.GL-dashboard-page-content-wrapper').css('top','0');
			}
			if( !this._options.layout.footer.on ){
				$('.GL-dashboard-page-footer-wrapper').hide();
				$('.GL-dashboard-page-content-wrapper').css('bottom','0');
			}
			if( !this._options.layout.leftSideArea.on ){
				$('.GL-dashboard-page-content-left').hide();
				$('.GL-dashboard-page-content-center').css('padding-left','0');
			}
			if( !this._options.layout.rightSideArea.on ){
				$('.GL-dashboard-page-content-right').hide();
				$('.GL-dashboard-page-content-center').css('padding-right','0');
			}
		}
		,_getTemplate: function(type, url){
			var _self=this, type=type;
			GL.ajax(
				{url: url}
				,function( data ){
					_self._doneHtmlTemplateCnt++;
					_self._setTemplate(type, data);
				}
				,function( data ){
					_self._doneHtmlTemplateCnt++;
					_self._setTemplate(type, data);
				}
			);
					
		}
		,_setTemplate: function( type, data ){
			if( type == 'centerArea' ){
				$('.GL-dashboard-page-content-center-wrapper').html(data || '&nbsp;');
			}else if( type == 'header' ){
				$('.GL-dashboard-page-header').html(data || '&nbsp;');
			}else if( type == 'footer' ){
				$('.GL-dashboard-page-footer').html(data || '&nbsp;');
			}else if( type == 'leftSideArea' ){
				$('.GL-dashboard-page-content-left').html(data || '&nbsp;');
			}else if( type == 'rightSideArea' ){
				$('.GL-dashboard-page-content-right').html(data || '&nbsp;');
			}
			
			if(this._htmlTemplateCnt == this._doneHtmlTemplateCnt){
				this._done_callback();
			}
		}
		,_getHTMLContainer: function(){
			var aHTML = [];
			aHTML.push('<div class="GL-dashboard-page-wrapper">');
			aHTML.push('	<div class="GL-dashboard-page-header-wrapper clearfix">');
			aHTML.push('		<div class="GL-dashboard-page-header">&nbsp;</div>');
			aHTML.push('	</div>');
			aHTML.push('	<div class="GL-dashboard-page-content-wrapper clearfix">');
			aHTML.push('		<div class="GL-dashboard-page-content">');
			aHTML.push('			<div class="GL-dashboard-page-content-center">');
			aHTML.push('				<div class="GL-dashboard-page-content-center-wrapper"></div>');
			aHTML.push('			</div>');
			aHTML.push('			<div class="GL-dashboard-page-content-left"></div>');
			aHTML.push('			<div class="GL-dashboard-page-content-right"></div>');
			aHTML.push('		</div>');
			aHTML.push('	</div>');
			aHTML.push('	<div class="GL-dashboard-page-footer-wrapper clearfix">');
			aHTML.push('		<div class="GL-dashboard-page-footer">&nbsp;</div>');
			aHTML.push('	</div>');
			aHTML.push('</div>');
			return aHTML.join('');
		}
	});
	
	GL.WebSocket = function(){
	
		this._clientsCallback = {};
		this._channels = {};
	
	};
	GL.WebSocket.prototype = new GL();
	GL.extend(GL.WebSocket, {
		//
		// wsSvcUrl : ws://hostname:port
		// status_callback(code, msg)
		//      code: 'NOAVAIL' -- websocket is not available
		//            'OPENED'  -- websocket is connected to the server
		//            'CLOSED'  -- websocket is closed
		//            'ERROR'   -- websocket error
		//            'NOTREADY' -- websocket is not ready
		//      msg: event message
		init : function(wsSvcUrl, status_callback){
			"use strict";

			var _self = this;
			
			// if user is running mozilla then use it's built-in WebSocket
			window.WebSocket = window.WebSocket || window.MozWebSocket;

			// if browser doesn't support WebSocket, just show some notification and exit
			if (!window.WebSocket) {
				status_callback('NOAVAIL', 'Sorry, but your browser doesn\'t support WebSockets.' );
				return;
			}

			// open connection
			if (GL.ws_connection) {
				GL.ws_connection.close();
				GL.ws_connection = null;
			}

			var connection = new WebSocket(wsSvcUrl);
			GL.ws_connection = connection;

			var pingTimerId = null;
			function stopPing() {
				if (pingTimerId != null) {
					clearInterval(pingTimerId);
					pingTimerId=null;
				}
			}

			connection.onopen = function () {
				// first we want users to enter their names
				//console.log('connected');
				status_callback('OPENED', 'connected');
				pingTimerId = setInterval( function () {
					send_message(connection, 'ping', '', '', 0, '', [new Date().getTime()]);
				}, 10000);
			};

			connection.onclose = function () {
				stopPing();
				stopcheck();
				status_callback('CLOSED', 'connection closed');
			};

			connection.onerror = function (error) {
				stopPing();
				// just in there were some problems with conenction...
				status_callback('ERROR', 'Sorry, but there\'s some problem with your connection or the server is down.');
			};

			// most important part - incoming messages
			// message = { type: delta - 추가데이터
			//                   history - 과거데이터 (array)
			//                   ping - heartbeat
			//                   pong - response to ping
			//                   subscribe/unsubscribe/queryonce  (cmd from cl to server)
			//             sid,  데이터키
			//             params, 파라미터   (option)
			//             interval,  조회주기 -- 향후 master에서 직접 실시간으로 받게되면 쓰이지 않음 (option)
			//             wid,  수신받는 widget id, subscribe할 때는 null (option)
			//             data: [] }
			connection.onmessage = function (message) {
				// try to parse JSON message. Because we know that the server always returns
				// JSON this should work without any problem but we should make sure that
				// the massage is not chunked or otherwise damaged.
				try {
					//console.log("message:"+message.data);
					var msg = JSON.parse(message.data);
					//console.log("message:"+msg.type+","+msg.sid+","+msg.wid);
				} catch (e) {
					//console.log('This doesn\'t look like a valid JSON: ', message.data);
					return;
				}

				// console.log("message:"+JSON.stringify(msg));

				if (msg.type=='pong') { // it's a heartbeat message
					var svtime = msg.data[0];
					//console.log('server time:'+new Date(svtime).format('yyyy/mm/dd HH:MM:SS'));
				}
				else if (msg.type=='history' || msg.type=='fixhistory' || msg.type=="delta") {
					if (msg.wid) { // deliver to the exact wid
						var callback = _self._clientsCallback[msg.wid];
						if (callback) {
							callback(msg);
						}
						else {
							//console.log('ERROR: message('+JSON.stringify(msg)+') for unknown widget:'+msg.wid);
							return;
						}
					}
					else {  // broadcast to listeners
						var key = msg.sid+msg.params;
						var listeners = _self._channels[key];
						if (listeners) {
							for (var wid in listeners) {
								var callback = _self._clientsCallback[wid];
								callback(msg);
							}
						}
						else {
							//console.log('ERROR: message('+JSON.stringify(msg)+') for empty listeners');
							return;
						}
					}
				}
				else {
					//console.log('Hmm..., I\'ve never seen JSON like this: '+JSON.stringify(msg));
				}
			};


			/**
			 * This method is optional. If the server wasn't able to respond to the
			 * in 3 seconds then show some error message to notify the user that
			 * something is wrong.
			 */
			var timerid_check = setInterval(function() {
				//console.log(connection.readyState);
				if (connection && connection.readyState !== 1) {
					add_status('NOTREADY', 'websocket not ready');
				}
			}, 30000);

			function stopcheck() {
				if (timerid_check) {
					clearInterval(timerid_check) ;
					timerid_check = null;
				}
			}
		}
		,ws_subscribe: function(wid, sid, req_params, interval, callback){
			
			this._clientsCallback[wid] = callback;
			
			// channel에 wid 등록
			var key = sid+req_params;
			var listeners = this._channels[key];
			if (listeners==null) {
				this._channels[key] = listeners = {};
			}
			listeners[wid] = true;
			
			this._send_message( GL.ws_connection, 'subscribe', sid, req_params, interval, null, null );
		}
		,ws_unsubscribe: function(wid, sid, req_params){
			
			var key = sid+req_params;
			var listeners = this._channels[key];
			if (listeners) {
				// sid listener에서 wid 제외
				delete listeners[wid];

				// sid를 subscribe하는 widget이 없으면 unsubscribe하고 sid를 channel에서 삭제
				var clientCount = Object.keys(listeners).length;
				if (clientCount==0) {
					delete this._channels[key];
					this._send_message(GL.ws_connection, 'unsubscribe', sid, req_params, null, null, null);
				}
			}
		}
		,_send_message: function(connection, type, sid, params, interval, wid, data) {
			var encodedParams = params;//escape(params);
			var message = {
				type : type,
				sid : sid,
				params : encodedParams,
				interval : interval,
				wid : wid,
				data : data
			};
			connection.send(JSON.stringify(message));
			//console.log("send message:"+JSON.stringify(message));
		}
	});
	
	GL.Selectbox = function( sId ){
		
		if(this.constructor == Function && !document.getElementById(sId).GL_Selectbox_Instance ){
			var selectboxInst = new GL.Selectbox(sId);
			document.getElementById(sId).GL_Selectbox_Instance = selectboxInst;
			return selectboxInst;
		}
		if(document.getElementById(sId).GL_Selectbox_Instance){
			return document.getElementById(sId).GL_Selectbox_Instance;
		}
		
		GL.call(this, arguments);
		this._options = {
			value: null
			,option:{
				height: 300
				,width: 200
			}
			,onSelect: null
		};
		this._sContainer = sId || '';
		this._aData = [];
		this._bOptionboxOpen = false;
		this._isSelectboxEvent = false;
	};
	GL.Selectbox.prototype = new GL();
	GL.extend(GL.Selectbox, {
		// method
		render: function( opt ){
			if( opt ){
				this._applyOptions( this._options, opt );
			}
			
			this._setHTMLSelectbox();
			this._setSelectboxEvent();
		}
		,open: function(){
			this._showOptionbox(true);
		}
		,close: function(){
			this._showOptionbox(false);
		}
		,setData: function( d ){
			this._aData = d;
		}
		,setValue: function( val ){
			this._options.value = val;
			var bDisabled = false;
			var target, selectTxt, selectVal=val;
			for(var i=0,len=this._aData.length; i<len; i++){
				
				if( this._aData[i]['group'] && this._aData[i]['group'].constructor == Array ){
					for(var j=0,slen=this._aData[i]['group'].length; j<slen; j++){
						if(this._aData[i]['group'][j].value == val){
							selectTxt = this._aData[i]['group'][j].text;
						}
					}
				}else{
					if( this._aData[i].value == val ){
						selectTxt = this._aData[i].text;
					}
				}
			}
			
			var el = document.querySelectorAll('#___GL_selectbox_optionbox_'+this._sContainer+' a');
			for( var i=0,len=el.length; i<len; i++ ){
				if( GL.attr(el[i], 'rel') == val ){
					target = el[i];
					break;
				}
			}
			
			this._selectItem(target, selectTxt, selectVal);
		}
		,getValue: function(){
			var selectElem = document.getElementById('___GL_selectbox_txtSelector_'+this._sContainer);
			return selectElem.getAttribute('selectValue');
			selectElem.innerHTML = text;
		}
		,getText: function(){
			var selectElem = document.getElementById('___GL_selectbox_txtSelector_'+this._sContainer);
			return selectElem.innerHTML;
		}
		// inner function
		,_setHTMLSelectbox: function(){
			var sHtml = this._getHTMLContainer();
			var con = document.getElementById(this._sContainer);
			con.style.display = 'none';
			
			var selectbox_con=document.createElement('div');
			//selectbox_con.setAttribute('id', '___GL_selectbox_container_'+this._sContainer);
			//selectbox_con.setAttribute('class', 'GL-selectbox-container');
			GL.attr(selectbox_con, 'id', '___GL_selectbox_container_'+this._sContainer);
			GL.attr(selectbox_con, 'class', 'GL-selectbox-container');
			selectbox_con.style.backgroundColor = '#fff';
			GL.insertAfter(selectbox_con, con);
			
			var selectbox = document.getElementById('___GL_selectbox_container_'+this._sContainer);
			selectbox.innerHTML = sHtml;
			
			if(this._options.value || this._options.value === 0){
				this.setValue(this._options.value);
			}
		}
		,_getHTMLContainer: function(){
			var opt = this._options;
			var aHtml = [];
			aHtml.push('<a id="___GL_selectbox_btnToggle_'+this._sContainer+'" href="#" class="GL-selectbox-btnToggle"></a>');
			aHtml.push('<a id="___GL_selectbox_txtSelector_'+this._sContainer+'" href="#" selectValue="" class="GL-selectbox-selector">-- Select --</a>');
			aHtml.push('<ul tabindex="-1" id="___GL_selectbox_optionbox_'+this._sContainer+'" class="GL-selectbox-options" style="visibility:hidden;">');
			this._setOptions(aHtml);
			aHtml.push('</ul>');
			
			return aHtml.join('');
		}
		,_setOptions: function( aHtml ){
			
			var bDisabled = false;
			
			if( this._aData.length == 0 ){
				
				var con = document.getElementById(this._sContainer);
				if( con.children.length == 0 ){
					return '';
				}else{
				
					var dataObj = [];
				
					for(var i=0,len=con.children.length; i<len; i++){
						
						//if(con.children[i].getAttribute('disabled')){
						if(GL.attr(con.children[i], 'disabled')){
							bDisabled = true;
						}else{
							bDisabled = false;
						}
						
						if( con.children[i].tagName == 'OPTION' ){
							if( bDisabled ){
								dataObj.push( {value:'', text:con.children[i].text, disabled:true} );
								aHtml.push('<li><span class="GL-selectbox-disabled">'+con.children[i].text+'</span></li>');
							}else{
								dataObj.push( {value:con.children[i].value, text:con.children[i].text} );
								aHtml.push('<li><a href="#" rel="'+con.children[i].value+'">'+con.children[i].text+'</a></li>');
							}	
						}else if( con.children[i].tagName == 'OPTGROUP' ){
							var optGroup = con.children[i];
							var optGroupObj = {value:'', text:GL.attr(optGroup, 'label'), group:[]};
							aHtml.push('<li><span class="GL-selectbox-group">'+GL.attr(optGroup, 'label')+'</span></li>');
							
							if( bDisabled ){
								for(var j=0,glen=optGroup.children.length; j<glen; j++){
									optGroupObj.group.push( {value:'', text:optGroup.children[j].text, disabled:true} );
									aHtml.push('<li><span class="GL-selectbox-disabled GL-selectbox-sub">'+optGroup.children[j].text+'</span></li>');
								}
							}else{
								for(var j=0,glen=optGroup.children.length; j<glen; j++){
									if(GL.attr(optGroup.children[j], 'disabled')){
									optGroupObj.group.push( {value:'', text:optGroup.children[j].text, disabled:true} );
									aHtml.push('<li><span class="GL-selectbox-disabled GL-selectbox-sub">'+optGroup.children[j].text+'</span></li>');
									}else{
									optGroupObj.group.push( {value:optGroup.children[j].value, text:optGroup.children[j].text} );
									aHtml.push('<li><a href="#" rel="'+optGroup.children[j].value+'" class="GL-selectbox-sub">'+optGroup.children[j].text+'</a></li>');
									}
								}
							}
							dataObj.push(optGroupObj);
						}
					}
					this._aData = dataObj;
				}
				
			}else{
				var con = document.getElementById(this._sContainer);
				con.innerHTML = '';
				for(var i=0,len=this._aData.length; i<len; i++){
					
					if(this._aData[i]['disabled']){
						bDisabled = true;
					}else{
						bDisabled = false;
					}
					
					if( this._aData[i]['group'] && this._aData[i]['group'].constructor == Array ){
						aHtml.push('<li><span class="GL-selectbox-group">'+(this._aData[i]['text'])+'</span></li>');
						if( bDisabled ){
							for(var j=0,slen=this._aData[i]['group'].length; j<slen; j++){
								aHtml.push('<li><span class="GL-selectbox-disabled GL-selectbox-sub">'+this._aData[i]['group'][j].text+'</span></li>');
							}
						}else{
							for(var j=0,slen=this._aData[i]['group'].length; j<slen; j++){
								if(this._aData[i]['group'][j]['disabled']){
									aHtml.push('<li><span class="GL-selectbox-disabled GL-selectbox-sub">'+this._aData[i]['group'][j].text+'</span></li>');
								}else{
									aHtml.push('<li><a href="#" rel="'+this._aData[i]['group'][j].value+'" class="GL-selectbox-sub">'+this._aData[i]['group'][j].text+'</a></li>');
								}
							}
						}
					}else{
						if( bDisabled ){
							aHtml.push('<li><span class="GL-selectbox-disabled">'+this._aData[i].text+'</span></li>');
						}else{
							aHtml.push('<li><a href="#" rel="'+this._aData[i].value+'">'+this._aData[i].text+'</a></li>');
						}
					}
				}
			}
			
			
		}
		,_showOptionbox: function( bOpen ){
			
			var box = document.getElementById('___GL_selectbox_optionbox_'+this._sContainer);
			var btnToggle = document.getElementById('___GL_selectbox_btnToggle_'+this._sContainer);
			var con = document.getElementById('___GL_selectbox_container_'+this._sContainer);
			
			if(bOpen){
				var sBrowser = GL.userAgent();
				var optHeight = parseInt(this._options.option.height, 10);
				if(
					sBrowser == 'Internet Explorer' ||
					sBrowser == '8' ||
					sBrowser == '7'
				){
					if( typeof( window.innerHeight ) == 'number' ) {
						var viewportHeight = window.innerHeight;
					} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
						//IE 6+ in 'standards compliant mode'
						var viewportHeight = parseInt(document.documentElement.clientHeight, 10);
					} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
						//IE 4 compatible
						var viewportHeight = parseInt(document.body.clientHeight, 10);
					}
				}else{
					if(
						sBrowser == 'Safari' ||
						sBrowser == 'Chrome'
					){
						var viewportHeight = parseInt(document.documentElement.clientHeight, 10);
					}else{
						var viewportHeight = parseInt(window.document.body.clientHeight, 10);
					}
				}
				var offsetTop = parseInt(box.offsetTop, 10);
				var scrollTop = parseInt(window.document.body.scrollTop, 10);
				var height = parseInt(con.clientHeight, 10)+2;	// margin +2.
				var diff = viewportHeight - (offsetTop - scrollTop) - height / 50;
				
				if( optHeight < (diff - height) ){
					var setHeight = optHeight;
				}else{
					var setHeight = diff - height;
				}
				
				this._bOptionboxOpen = true;
				box.style.visibility = 'visible';
				box.style.height = setHeight+'px';
				GL.addClass(btnToggle, 'GL-selectbox-btnToggleOpen');
				
				box.style.top = height + "px";
				box.style.maxHeight = (diff - height) + "px";
				
				if(
					sBrowser == 'Internet Explorer' ||
					sBrowser == '9' ||
					sBrowser == '8' ||
					sBrowser == '7' ||
					GL.detectMobile()
				){
					box.focus();
				}
			}else{
				this._bOptionboxOpen = false;
				box.style.visibility = 'hidden';
				box.style.height = '0px';
				GL.removeClass(btnToggle, 'GL-selectbox-btnToggleOpen');
			}
			
			this._isSelectboxEvent = false;
		}
		,_setSelectboxEvent: function(){
			var _self = this;
			var elem = document.getElementById('___GL_selectbox_container_'+this._sContainer);
			elem.__GL_Selectbox_This = this;
			//this._setTouchEvent(elem);
			this._setEvent(elem);
			
		}
		,_setEvent: function( elem ){
			GL.addEvent("mouseup", elem, this._eventListener);
			GL.addEvent("mousedown", elem, this._eventListener);
			
			var selectCon = document.getElementById('___GL_selectbox_optionbox_'+this._sContainer);
			if( GL.userAgent() == 'Firefox' ){
				GL.addEvent("blur", selectCon, this._eventListener);
			}else if(
				GL.userAgent() == 'Internet Explorer' ||
				GL.userAgent() == '9' ||
				GL.userAgent() == '8' ||
				GL.userAgent() == '7' 
			){
				GL.addEvent("blur", selectCon, this._eventListener);
			}else{
				GL.addEvent("focusout", selectCon, this._eventListener);
			}
			
			var box = document.getElementById('___GL_selectbox_optionbox_'+this._sContainer);
			box.__GL_Selectbox_This = this;
			GL.addEvent("webkitTransitionEnd", box, this._eventListenerTransitionEnd);
			GL.addEvent("transitionend", box, this._eventListenerTransitionEnd);
			GL.addEvent("msTransitionEnd", box, this._eventListenerTransitionEnd);
			GL.addEvent("oTransitionEnd", box, this._eventListenerTransitionEnd);
		}
		,_setTouchEvent: function( elem ){
			GL.addEvent("touchstart", elem, this._touchHandler);
			GL.addEvent("touchmove", elem, this._touchHandler);
			GL.addEvent("touchend", elem, this._touchHandler);
		}
		,_touchHandler: function(event){
			var touches = event.changedTouches,
				first = touches[0],
				type = "";
				
			switch(event.type){
				case "touchstart": type = "mousedown"; break;
				case "touchmove":  type="mousemove"; break;        
				case "touchend":   type="mouseup"; break;
				default: return;
			}
	  
			//initMouseEvent(type, canBubble, cancelable, view, clickCount, 
			//           screenX, screenY, clientX, clientY, ctrlKey, 
			//           altKey, shiftKey, metaKey, button, relatedTarget);
			var simulatedEvent = document.createEvent("MouseEvent");
			simulatedEvent.initMouseEvent(type, true, true, window, 1, 
									  first.screenX, first.screenY, 
									  first.clientX, first.clientY, false, 
									  false, false, false, 0/*left*/, null);
	  
			first.target.dispatchEvent(simulatedEvent);
			event.preventDefault();
		}
		,_eventListener: function(e){
			var target = e.target ? e.target : event.srcElement;
			var eThis = null;
			var targetElem = null;
			var cb = function(elem){
				if(elem.nodeName == "DIV" && elem.__GL_Selectbox_This){
					eThis = elem.__GL_Selectbox_This;
					targetElem = elem;
				}else{
					cb(elem.parentElement);
				}
			};
			cb(target);
			
			if(e.type == 'focusout'){
				if(!eThis._isSelectboxEvent){
					eThis._showOptionbox(false);
				}
			// Firefox	
			}else if( e.type == 'blur' && !GL.detectMobile() ){
				if(!eThis._isSelectboxEvent){
					eThis._showOptionbox(false);
				}
			}else if(e.type == 'mousedown'){
				if(
					(target.nodeName == "A" && target.id == '___GL_selectbox_btnToggle_'+eThis._sContainer) ||
					(target.nodeName == "A" && target.id == '___GL_selectbox_txtSelector_'+eThis._sContainer) ||
					(target.nodeName == "A" && GL.attr(target, 'rel'))
				){
					eThis._isSelectboxEvent = true;
				}
			}else{
				if( e.type == 'mouseup' && target.nodeName == 'UL' ){
					return false;
				}
				
				// select item.
				if(target.nodeName == "A" && GL.attr(target, 'rel')){
					var selectVal = GL.attr(target, 'rel');
					var selectTxt = target.textContent || (target.innerText || target.innerHTML);
					eThis._selectItem(target, selectTxt, selectVal);
					
					if(eThis._options.onSelect && eThis._options.onSelect.constructor == Function){
						eThis._options.onSelect({value:selectVal, text:selectTxt});
					}
					
					if(eThis._bOptionboxOpen){
						eThis._showOptionbox(false);
					}else{
						eThis._showOptionbox(true);
					}
				}else if(
					target.nodeName == "SPAN" 
					&& (GL.hasClass(target, 'GL-selectbox-disabled') 
						|| GL.hasClass(target, 'GL-selectbox-group')) 
				){
					
				}else{
					if(eThis._bOptionboxOpen){
						eThis._showOptionbox(false);
					}else{
						eThis._showOptionbox(true);
					}
				}
			}	
			
		}
		,_eventListenerTransitionEnd: function(e){
			var target = e.target ? e.target : event.srcElement;
			var targetElem = null;
			var eThis = null;
			var cb = function(elem){
				if(elem.nodeName == "UL" && elem.__GL_Selectbox_This){
					targetElem = elem;
					eThis = elem.__GL_Selectbox_This;
				}else{
					cb(elem.parentElement);
				}
			};
			cb(target);
			
			
				var box = document.getElementById('___GL_selectbox_optionbox_'+eThis._sContainer);
				box.focus();
			
			
		}
		,_selectItem: function(target, text, value){
			var selectElem = document.getElementById('___GL_selectbox_txtSelector_'+this._sContainer);
			selectElem.setAttribute('selectValue', value);
			selectElem.innerHTML = text;
			
			var el = document.querySelectorAll('#___GL_selectbox_optionbox_'+this._sContainer+' a');
			for( var i=0,len=el.length; i<len; i++ ){
				GL.removeClass( el[i], 'GL-selectbox-focus');
			}
			GL.addClass(target, 'GL-selectbox-focus');
		}
	});
	
	GL.dataTable = function(){
		GL.call(this, arguments);
		this._options = {
			container: arguments[0] || null
			,template: ''
		};
		this._tableData		= [];
		this._tableTemplate	= '';
		this._headerTemplate = '';
		this._bodyTemplate	= '';
		this._done_callback = null;
		
	};
	GL.dataTable.prototype = new GL();
	GL.extend(GL.dataTable, {
		show: function(opt){
			var _self = this;
			if( opt ){
				this._applyOptions( this._options, opt );
			}
			
			GL.ajax(
				{url: this._options.template}
				,function( data ){
					_self._setTemplate(data);
					_self._setDataBind();
					if(_self._done_callback){
						_self._done_callback();
					}
				}
				,function( data ){alert(data);}
			);
		}
		,done: function( callback ){
			this._done_callback = callback;
		}
		,setData: function( aData ){
			this._tableData = aData || [];
		}
		,_setTemplate: function(data){
			try{var headerTemp = (data.match(/<thead[^>]*>([.|\w|\W]*?)<\/thead>/gi))[0].replace(/<thead>|<\/thead>/gi, '');}catch(ex){var headerTemp='';}
			var bodyTemp = (data.match(/<tbody[^>]*>([.|\w|\W]*?)<\/tbody>/gi))[0].replace(/<tbody>|<\/tbody>/gi, '');
			this._tableTemplate = data.replace(bodyTemp, '');
			this._headerTemplate = headerTemp;
			this._bodyTemplate	= bodyTemp;
			
		}
		,_setDataBind: function( aData ){
			var len = this._tableData.length || 0;
			var sumHtml = [];
			var bodyStr='', dataObj, sKey, sVal;
			
			for( var i=0; i<len; i++ ){
				dataObj = this._tableData[i];
				bodyStr = '';
				bodyStr += this._bodyTemplate;
				for( sKey in dataObj ){
					sVal = dataObj[sKey];
					//bodyStr = bodyStr.replace('\{'+sKey+'\}', sVal);
					bodyStr = GL.replaceAll(bodyStr, '\{'+sKey+'\}', sVal);
				}
				sumHtml.push(bodyStr);
			}
			
			var con = document.getElementById(this._options.container);
			con.innerHTML = this._tableTemplate;
			con.getElementsByTagName('tbody')[0].innerHTML = sumHtml.join('');
		}
		
	});
	
	GL.Slider = function( sId ){
	
		if(this.constructor == Function && !document.getElementById(sId)['GL_Slider_Instance'] ){
			var sliderInst = new GL.Slider(sId);
			document.getElementById(sId).GL_Slider_Instance = sliderInst;
			return sliderInst;
		}
		if(document.getElementById(sId).GL_Slider_Instance){
			return document.getElementById(sId).GL_Slider_Instance;
		}
	
		GL.call(this, arguments);
		this._options = {
			range: false		// true | false | 'min' | 'max'
			,height: '10px'
			,width: '100%'
			,orientation: 'horizontal'	// horizontal | vertical
			,min: 0
			,max: 100
			,value: 0
			,values: null
			// events
			,change: null
			,slide: null
		};
		this.sContainer = sId || '';
		this.dragElem = null;
		this.sliderSize = {min:0, max:null, gap:null, gapList:[]};
		this.slideIdx = 0;
		this.aSlideRangeVal = [];
		this.aSlideRangeIdx = null;
		
	};
	GL.Slider.prototype = new GL();
	GL.extend(GL.Slider, {
		render: function( opt ){
			if( opt ){
				this._applyOptions( this._options, opt );
			}
			
			var sHtml = this._getHTMLContainer();
			var con = document.getElementById(this.sContainer);
			con.innerHTML = sHtml;
			
			if( this._options.orientation == 'horizontal' ){
				if( 
					parseInt(con.clientWidth, 10) <= 0 &&
					GL.userAgent() == 'Internet Explorer'
				){
					this.sliderSize.max = parseInt(con.parentElement.clientWidth, 10);
				}else{
					this.sliderSize.max = parseInt(document.getElementById(this.sContainer).clientWidth, 10);
				}	
			}else if( this._options.orientation == 'vertical' ){
				this.sliderSize.max = parseInt(document.getElementById(this.sContainer).clientHeight, 10);
			}
			
			this.sliderSize.gap = this.sliderSize.max / (this._options.max - this._options.min);
			var len = this.sliderSize.max / this.sliderSize.gap;
			for( var i=0; i<len+1; i++ ){
				this.sliderSize.gapList.push(this.sliderSize.gap * i);
			}
			
			this.slideIdx = this._options.min;
			
			this._setSliderEvent();
			this._defaultSliderLayout();
		}
		
		// inner function
		,_setSliderEvent: function(){
			var _self = this;
			var elem = document.querySelectorAll('#'+this.sContainer+' .GL-slider-handle');
			if( elem.length ){
				for( var i=0,len=elem.length; i<len; i++ ){
					this._setTouchEvent(elem[i]);
					this._setEvent( elem[i] );
				}
			}else{
				this._setTouchEvent(elem);
				this._setEvent(elem);
			}
		}
		,_getHTMLContainer: function(){
		
			var opt = this._options;
			var aHtml = [];
			aHtml.push('<div class="GL-slider-range GL-slider-corner-all"></div>');
			aHtml.push('<a href="#" class="GL-slider-handle GL-slider-corner-all"></a>');
			if(opt.range.constructor != String && opt.range){
				aHtml.push('<a href="#" class="GL-slider-handle GL-slider-corner-all"></a>');
			}
			
			return aHtml.join('');
		}
		,_defaultSliderLayout: function(){
			var con = document.getElementById(this.sContainer);
			var opt = this._options;
			var gapList = this.sliderSize.gapList;
			con.className = 'GL-slider-container GL-slider-corner-all GL-slider-horizontal';
			con.style.height = opt.height;
			con.style.width = opt.width;
			
			// set range div
			var elemRange = document.querySelector('#'+this.sContainer+' .GL-slider-range');
			var rangePosition = this._options.range;
			
			if( rangePosition.constructor == String ){
			
				// set handle value
				var idx = opt.value - opt.min;
				if( idx < 0 || isNaN(idx) ){
					idx = 0;
				}
				var oElem = document.querySelector('#'+this.sContainer+' .GL-slider-handle');
				oElem.style.left = gapList[idx] + 'px';
			
				if( rangePosition == 'min' ){
					elemRange.className = 'GL-slider-range GL-slider-corner-all GL-slider-range-min';
					var w = parseInt(oElem.style.left, 10);
					elemRange.style.width = w + 'px';
				}else if( rangePosition == 'max' ){
					elemRange.className = 'GL-slider-range GL-slider-corner-all GL-slider-range-max';
					var w = this.sliderSize.max - parseInt(oElem.style.left, 10);
					elemRange.style.width = w + 'px';
				}
			}else if( rangePosition.constructor == Boolean ){
				
				// set handle value
				if( opt.values && opt.values.length === 2 ){
					var idx = [];
					idx.push( opt.values[0] - opt.min );
					if( idx[0] < 0 || isNaN(idx[0]) ){ idx[0] = 0; }
					idx.push( opt.values[1] - opt.min );
					if( idx[1] < 0 || isNaN(idx[1]) ){ idx[1] = 0; }
					
					this.aSlideRangeVal = [ gapList[idx[0]], gapList[idx[1]] ];
					this.aSlideRangeIdx = idx;
					
					var oElem = document.querySelectorAll('#'+this.sContainer+' .GL-slider-handle');
					oElem[0].style.left = gapList[idx[0]] + 'px';
					oElem[1].style.left = gapList[idx[1]] + 'px';
					
					if( rangePosition === true ){
						var l = gapList[idx[0]];
						var w = gapList[idx[1]] - gapList[idx[0]];
						elemRange.className = 'GL-slider-range GL-slider-corner-all GL-slider-range';
						elemRange.style.left = l + 'px';
						elemRange.style.width = w + 'px';
					}
				}	
			}
		}
		,_setRangeArea: function( posX, idx, sFirst ){
			
			var elemRange = document.querySelector('#'+this.sContainer+' .GL-slider-range');
			var rangePosition = this._options.range;
			if( rangePosition.constructor == String ){
				if( rangePosition == 'min' ){
					elemRange.style.width = posX + 'px';
				}else if( rangePosition == 'max' ){
					var w = this.sliderSize.max - posX;
					elemRange.style.width = w + 'px';
				}
			}else if( rangePosition.constructor == Boolean ){
				if( rangePosition === true ){
					if( sFirst ){
						if(posX){ this.aSlideRangeVal[0] = posX; }
						if(posX===0){ this.aSlideRangeVal[0] = posX; }
						if(idx==0 || idx){ this.aSlideRangeIdx[0] = idx; }
						elemRange.style.left = posX + 'px';
						elemRange.style.width = (this.aSlideRangeVal[1] - posX) + 'px';
					}else{
						if(posX){ this.aSlideRangeVal[1] = posX; }
						if(idx==0 || idx){ this.aSlideRangeIdx[1] = idx; }
						elemRange.style.width = (posX - this.aSlideRangeVal[0]) + 'px';
					}
				
				}
			}
			
		}
		,_setTouchEvent: function( elem ){
			GL.addEvent("touchstart", elem, this._touchHandler);
			GL.addEvent("touchmove", elem, this._touchHandler);
			GL.addEvent("touchend", elem, this._touchHandler);
		}
		,_touchHandler: function(event){
			var touches = event.changedTouches,
				first = touches[0],
				type = "";
				
			switch(event.type){
				case "touchstart": type = "mousedown"; break;
				case "touchmove":  type="mousemove"; break;        
				case "touchend":   type="mouseup"; break;
				default: return;
			}
	  
			//initMouseEvent(type, canBubble, cancelable, view, clickCount, 
			//           screenX, screenY, clientX, clientY, ctrlKey, 
			//           altKey, shiftKey, metaKey, button, relatedTarget);
			var simulatedEvent = document.createEvent("MouseEvent");
			simulatedEvent.initMouseEvent(type, true, true, window, 1, 
									  first.screenX, first.screenY, 
									  first.clientX, first.clientY, false, 
									  false, false, false, 0/*left*/, null);
	  
			first.target.dispatchEvent(simulatedEvent);
			event.preventDefault();
		}
		,_setEvent: function( elem ){
			if( !elem ){ return; }
			var _self = this;
			elem.onmousedown = function(e) {
				
				e = e ? e : window.event;
				var oElem = _self.dragElem = this;
				
				if(!!oElem.nextSibling){
					oElem.firstHandle = true;
				}else{
					oElem.firstHandle = false;
				}
				
				if( _self._options.orientation == 'horizontal' ){
					if (isNaN(parseInt(oElem.style.left))) { oElem.style.left = '0px'; }
					var x = parseInt(oElem.style.left);
					oElem.mouseX = e.clientX;
					oElem.startX = x;
				}else if( _self._options.orientation == 'vertical' ){
					if (isNaN(parseInt(oElem.style.top))) { oElem.style.top = '0px'; }
					var y = parseInt(oElem.style.top);
					oElem.mouseY = e.clientY;
				}
		 
				document.onmousemove = function(e) {
					e = e ? e : window.event;
					var oElem = _self.dragElem;
					var gap = _self.sliderSize.gap;
					var gapHalf = (_self.sliderSize.gap / 2);
					var gapList = _self.sliderSize.gapList;
					
					if( _self._options.orientation == 'horizontal' ){
						
						var val = parseInt(e.clientX - oElem.mouseX, 10)+gapHalf;
						var moveVal = oElem.startX + val;
						var idx = parseInt(( (_self._options.max - _self._options.min) * moveVal ) / _self.sliderSize.max, 10);
						
						if( _self._options.range.constructor == Boolean && _self._options.range === true ){
							if( oElem.firstHandle ){
								if(gapList[idx] <= _self.aSlideRangeVal[1]){
									oElem.style.left = gapList[idx] + 'px';
									oElem.sliderIdx = idx;
									_self._setRangeArea(gapList[idx], idx, true);
								}
								
							}else{
								if(gapList[idx] >= _self.aSlideRangeVal[0]){
									oElem.style.left = gapList[idx] + 'px';
									oElem.sliderIdx = idx;
									_self._setRangeArea(gapList[idx], idx, false);
								}
							}
						}else{
							oElem.style.left = gapList[idx] + 'px';
							oElem.sliderIdx = idx;
							_self._setRangeArea(gapList[idx], idx, false);
						}
						
					}else if( _self._options.orientation == 'vertical' ){
						var y = parseInt(oElem.style.top);
						oElem.style.top = y + (e.clientY - oElem.mouseY) + 'px';
						oElem.mouseY = e.clientY;
					}
					
					if( _self.slideIdx != (_self._options.min + idx) ){
						if( _self._options.slide && _self._options.slide.constructor == Function ){
							var returnVal = _self._options.min + oElem.sliderIdx;
							returnVal = isNaN(returnVal)? _self._options.min:returnVal;
							returnVal = returnVal < _self._options.min? _self._options.min:returnVal;
							returnVal = returnVal > _self._options.max? _self._options.max:returnVal;
							
							var returnValues = null;
							if( _self._options.range.constructor == Boolean && _self._options.range === true ){
								returnValues = [];
								returnValues.push(_self._options.min + _self.aSlideRangeIdx[0]);
								returnValues.push(_self._options.min + _self.aSlideRangeIdx[1]);
								returnValues[0] = isNaN(returnValues[0])? _self._options.min:returnValues[0];
								returnValues[0] = returnValues[0] < _self._options.min? _self._options.min:returnValues[0];
								returnValues[0] = returnValues[0] > _self._options.max? _self._options.max:returnValues[0];
								returnValues[1] = isNaN(returnValues[1])? _self._options.min:returnValues[1];
								returnValues[1] = returnValues[1] < _self._options.min? _self._options.min:returnValues[1];
								returnValues[1] = returnValues[1] > _self._options.max? _self._options.max:returnValues[1];
								
								if( oElem.firstHandle ){
									if( returnValues[0] >= returnValues[1] ){ returnValues[0] = returnValues[1]; }
								}else{
									if( returnValues[0] >= returnValues[1] ){ returnValues[1] = returnValues[0]; }
								}
								
								
							}
							_self._options.slide(e, {value:returnVal, values:returnValues});
						}
						_self.slideIdx = (_self._options.min + idx);
					}
			 
					
					return false;
				};
				document.onmouseup = function(e) {
					var oElem = _self.dragElem;
			 
					var x = parseInt(oElem.style.left);
					var y = parseInt(oElem.style.top);
			 
					var val = _self._options.min + oElem.sliderIdx;
					val = isNaN(val)? _self._options.min:val;
					
					var returnValues = null;
					if( _self._options.range.constructor == Boolean && _self._options.range === true ){
						returnValues = [];
						returnValues.push(_self._options.min + _self.aSlideRangeIdx[0]);
						returnValues.push(_self._options.min + _self.aSlideRangeIdx[1]);
						returnValues[0] = isNaN(returnValues[0])? _self._options.min:returnValues[0];
						returnValues[0] = returnValues[0] < _self._options.min? _self._options.min:returnValues[0];
						returnValues[0] = returnValues[0] > _self._options.max? _self._options.max:returnValues[0];
						returnValues[1] = isNaN(returnValues[1])? _self._options.min:returnValues[1];
						returnValues[1] = returnValues[1] < _self._options.min? _self._options.min:returnValues[1];
						returnValues[1] = returnValues[1] > _self._options.max? _self._options.max:returnValues[1];
						
						if( oElem.firstHandle ){
							if( returnValues[0] > returnValues[1] ){ returnValues[0] = returnValues[1]; }
						}else{
							if( returnValues[0] > returnValues[1] ){ returnValues[1] = returnValues[0]; }
						}
					}
					
					if( _self._options.change && _self._options.change.constructor == Function ){
						_self._options.change(e, {value:val, values:returnValues});
					}
					
					_self.slideIdx = oElem.sliderIdx;
			 
					document.onmousemove = null;
					document.onmouseup = null;
					_self.dragElem = null;
				};
				return false;
			};
		}
	});
	
	GL.Tabs = function( sId ){
	
		if(this.constructor == Function && !document.getElementById(sId)['GL_Tabs_Instance'] ){
			var tabInst = new GL.Tabs(sId);
			document.getElementById(sId).GL_Tabs_Instance = tabInst;
			return tabInst;
		}
		if(document.getElementById(sId).GL_Tabs_Instance){
			return document.getElementById(sId).GL_Tabs_Instance;
		}
		
		
	};
	GL.Tabs.prototype = new GL();
	GL.extend(GL.Tabs, {
		render: function( opt ){
			
		}
		
		// inner function
		
	});
	
	GL.Chart = function( sId ){
		this.sContainer = sId || '';
		this.aData = [];
	};
	GL.Chart.prototype = new GL();
	GL.extend(GL.Chart, {
		show: function( type, option ){
			if(type){
				if( type == 'Gauge' ){
					var chart = new GLChartWidgets.Gauge(this.sContainer);
					chart.setData(this.aData);
					chart.render(option);
				}else{
					var chart = new GLChart[type](this.sContainer);
					chart.setDataJson(this.aData);
					//chart.setSelection([{row:1, column:0}, {row:2, column:0}, {row:2, column:1}]);
					chart.render(option);
				}	
			}	
		}
		,setData: function( data ){
			this.aData = data || [];
		}
	});
	// Implementation of Components (END)=========================================================
	
	
	// get js parameter namespace----------------------------------
	function _paramMethod(){
		var scripts = document.getElementsByTagName('script');
		var _myScript = scripts[ scripts.length - 1 ];
		var temp = _myScript.src.split("?");
		if(temp[1]){
			var data = temp[1].split("&");
			for(var param=0; param<data.length; param++){
				var paramData = data[param].split("=");
				if( paramData[0] == 'GLjs' ){
					window[paramData[1]] = GL;
				}else{
					window.GLjs = GL;
				}
			}
		}else{
			window.GLjs = GL;
		}
	}
	_paramMethod();
	// get js parameter namespace----------------------------------
	
	
})( window );


