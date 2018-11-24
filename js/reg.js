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
	var loginPage = plus.webview.getLaunchWebview();
	loginPage.hide();
	
	
	getServices();
	mui(".mui-bar-nav").on("tap",".share",function ( evt ) {
		shareWeb( msg );
	})
	
	/*
		切换登录页 
	 * */
	mui(".mui-content-padded").on("tap","#login",function () {
		loginPage.show("pop-in",200);
	});

});