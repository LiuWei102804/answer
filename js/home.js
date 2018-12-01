(function ( $ , doc ) {
// 	var old_back = mui.back;
// 	$.back = function () {
// 		var opener = plus.webview.currentWebview().opener();
// 		if( opener.id == "./index.html" ) {
// 			plus.webview.getLaunchWebview().show("slide-in-right",200,function () {
// 				
// 			})
// 		} else {
// 			old_back();
// 		}
// 	}
	$.init({
		
	})
	$.plusReady(function () {
	// 				var gallery = $('.$-slider'); 
	// 				gallery.slider({
	// 					interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
	// 				});
		
		var newsDiv = $(".news div")[0];
		getNews({ phone : "18918455233" } , newsDiv);

		
		if( plus.os.name.toLocaleLowerCase() == "android" ) {
			plus.nativeUI.closeWaiting();
		}
	
	
		$(".account-class").on("tap",".newpage-div",function () {
			var page = this.dataset.page;
			openPage( page );
		});
		
		//console.log( plus.storage.getItem("userInfo") )

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
	/*
		查询新闻咨询
	*/
   function getNews( params , obj ) {
	   app.getNews( params ).then(function ( res ) {
		   if( res.hasOwnProperty("success") && res.success ) {
			   var data = res.data;
			   if( data instanceof Array ) {
				   console.log( JSON.stringify( data ) ) 
				   var html = "";
				   for( var i = 0; i < data.length; i ++ ) {
					   html += "<small>"+ data[i].title +"</small>";
				   }
				   obj.innerHTML = html;
				   //$.later(function () {
					runNews( obj );  
				   //});
				   
			   } else {
				   $.toast( requestMsg.fail );
			   }
		   } else {
			   $.toast( requestMsg.fail );
		   }
	   },function ( err ) {
		   $.toast( requestMsg.fail );
	   });
   };
   
   /*
		滚动咨询
   */
  function runNews( elem ) {
	var maxLength = elem.children.length;
	var height = elem.parentNode.offsetHeight;
	var index = 0; 

	var t = setInterval(function () {
		index ++;
		if( index == maxLength ) {
			index = 0;
		}
		var run = index * height;
		elem.style.transform = "translate(0px,"+ -run +"px) translateZ(0px)";
		elem.style.WebkiyTransform = "translate(0px,"+ -run +"px) translateZ(0px)";
	},3000);
  }
})( mui , document );
