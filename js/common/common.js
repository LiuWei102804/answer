!function( w ){
	document.addEventListener('touchstart',shield,false);
	// 空函数
	function shield(){
		return false;
	}
	//的样式在手机上正常生效
	document.oncontextmenu=shield;//屏蔽选择函数
	w.openPage = function ( url , extras ) {
		return mui.openWindow({
			url : url ,
			id : url ,
			styles : {
				top: "0px" ,
				bottom : "0px"
			} ,
			createNew : false ,
			show : {
				autoShow : true ,
				aniShow : "pop-in" 
				//duration : 0 
			} ,
			waiting : {
				autoShow : true ,
				title : "正在加载...."
			} ,
			extras : extras
		});
	};
	/*
	 	隐藏2级页面
	 * */
	w.hideSubPage = function ( current ) {
		var subpages = ["./pages/home.html","./pages/userCenter.html"];
		for( var i = 0; i < subpages.length; i ++ ) {
			if( current && subpages[i] == current ) {
				continue;
			}
			var sub = plus.webview.getWebviewById( subpages[i] );
			sub.hide();
		};
	}
	/*
	 	关闭二级页面
	 * */
	w.closeSubPage = function () {
		var subpages = ["./pages/home.html","./pages/userCenter.html"];
		for( var i = 0; i < subpages.length; i ++ ) {
			var sub = plus.webview.getWebviewById( subpages[i] );
			sub.close();
		};
	};
}( window );