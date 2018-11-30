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
	 
	 console.log( plus.device.uuid )

	/* 
	 * 	  打开微信
	 **/ 
//		plus.runtime.launchApplication({   
//			pname : "com.tencent.mm" ,    
//			action : "weixin://dl/business/?ticket=te95c0ed54766d87903e7c9a073e1e849" ,  
//			//extra : { url : "https://www.baidu.com" } 
//		},function ( err ) { 
//			$.confirm("检测到您未安装\"微信\",是否前往下载","提示",function ( btn ) {	
//				if( btn.index == 1 ) {
//					if( plus.os.name.toLocaleLowerCase() == "ios" ) {
//						plus.runtime.openURL("https://itunes.apple.com/cn/app/wechat/id414478124?mt=8"); 
//						 
//					} else {
//						plus.runtime.openURL("https://dldir1.qq.com/weixin/android/weixin673android1360.apk");
//					}
//
//				}  
//			})   
//		});   			
	}); 
})( mui , document );
