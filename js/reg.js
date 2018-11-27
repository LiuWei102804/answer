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
		
		$(".mui-content-padded").on("tap","#reg",function () {
			app.reg({ account : "13857102804" , password : "123456" }).then(function ( res ) {
				console.log( JSON.stringify( res ) )
			},function ( err ) {
				
			});
		})
		
		getServices();
		mui(".mui-bar-nav").on("tap",".share",function ( evt ) {
			shareWeb( msg );
		});
	})
})( mui , document );
