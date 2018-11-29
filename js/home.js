(function ( $ , doc ) {
	$.plusReady(function () {
	// 				var gallery = $('.$-slider'); 
	// 				gallery.slider({
	// 					interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
	// 				});
	 
	if( plus.os.name.toLocaleLowerCase() == "android" ) {
		plus.nativeUI.closeWaiting();
	}
	
	
	
	$(".account-class").on("tap",".newpage-div",function () {
		var page = this.dataset.page;
		openPage( page );
	});
	 
	//plus.runtime.openWeb("http://action-ing.com.cn/demo/api_url/pay.php?appkey=1726_f4b5f7c86bc844ecfcef23b6fef8dec9&uid=13&total_fee=2&pay_title=%E6%94%B6%E6%AC%BE%E4%BA%BA%E3%80%90%CA%9A%20%EF%A3%BF%20%C9%9E%E3%80%91&order_no="); 
	/* 
	 * 	  打开微信
	 **/
	//				plus.runtime.launchApplication({
	//					pname : "com.tencent.mm" ,
	//					action : "weixin://RnUbAwvEilb1rU9g9yBU" ,
	//					//extra : { url : "https://www.baidu.com" } 
	//				},function ( err ) { 
	//					$.confirm("检测到您未安装\"微信\",是否前往下载","提示",function ( btn ) {	
	//						if( btn.index == 1 ) {
	//							if( plus.os.name.toLocaleLowerCase() == "ios" ) {
	//								plus.runtime.openURL("https://itunes.apple.com/cn/app/wechat/id414478124?mt=8"); 
	//								
	//							} else {
	//								plus.runtime.openURL("https://dldir1.qq.com/weixin/android/weixin673android1360.apk");
	//							}
	//
	//						}  
	//					})   
	//				});   			
	}); 
})( mui , document );
