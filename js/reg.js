/*
 	分享参数
 * */
var msg = {
	title : "测试分享" ,
	content : "测试分享OK" ,
	href : "https://www.baidu.com" ,
	smallImg : "_www/iphone4.png"
};

(function ( $ , doc ) {
	$.init({
	
	});
	
	$.plusReady(function () {
		var account = $("#account")[0];
		var password = $("#password")[0];
		$(".mui-content-padded").on("tap","#reg",function () {
			var params = {
				account : account.value ,
				password : password.value 
			};
			if( !Pattern.isPhone( params.account ) ) {
				mui.toast("请输入正确的手机号");
				return;
			}
			if( !Pattern.isEnglishAndNumber( params.password , 6 , 20 ) ) {
				mui.toast("请使用6-20位数字加字母组合");
				return;
			}
			doc.activeElement.blur();
			plus.nativeUI.showWaiting("请等待...");
			app.reg( params ).then(function ( res ) {
				console.log( JSON.stringify( res ) )
				plus.nativeUI.closeWaiting();
			},function ( err ) {
				plus.nativeUI.closeWaiting();
			});
		})
		
		getServices();
		mui(".mui-bar-nav").on("tap",".share",function ( evt ) {
			shareWeb( msg );
		});
	})
})( mui , document );
