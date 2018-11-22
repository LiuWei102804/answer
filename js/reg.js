/*
 	分享参数
 * */
var msg = {
	title : "测试分享" ,
	content : "测试分享OK" ,
	href : "https://www.baidu.com" ,
	smallImg : "_www/iphone4.png"
};

mui.init({

});
mui.plusReady(function() {
	var currentWebview = plus.webview.currentWebview();
	
	/*
	 	隐藏登录页面
	 * */
//	currentWebview.addEventListener("show",function () {
//		var opener = currentWebview.opener();
//		opener.hide();
//		console.log("登录页隐藏")
//	},false)
	
	
	getServices();
	mui(".mui-bar-nav").on("tap",".share",function ( evt ) {
		shareWeb( msg );
	})
	
	
	/*
		切换登录页 
	 * */
	mui(".mui-content-padded").on("tap","#login",function () {
		mui.back();
	});

});