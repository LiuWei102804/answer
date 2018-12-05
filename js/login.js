(function ( $ , doc ) {
		$.init({
// 			preloadPages : [{
// 				url:"./index.html" ,
// 			    id:"./index.html" ,
// 			    styles:{
// 			    	top : 0 ,
// 			    	bottom : 0
// 			    } //窗口参数
// //			    //extras:{},//自定义扩展参数
// //			    //subpages:[{},{}]//预加载页面的子页面
// 			}] ,
			//statusBarBackground: '#f7f7f7'
		});
		$.plusReady(function () {
				var currentWebview = plus.webview.currentWebview();
				var userInfo = plus.storage.getItem("userInfo");
				var account = $("#account")[0];
				var password = $("#password")[0];
				
				if( userInfo != null ) {
					//openPage("./index.html");
				}
				console.log( md5("abc123") )
				currentWebview.addEventListener("show",function () {
					var all = plus.webview.all();
					for( var i = 0; i < all.length; i ++ ) {
							if( all[i].id == currentWebview.id ) {
								continue;
							}
							all[i].close("pop-out",0);
					}

					//console.log(1)
				},false);
				/*
					切换注册
				* */
				$(".mui-content-padded").on("tap","#reg",function () {
						openPage("./reg.html");
				});
				/*
					忘记密码
				*/
				$(".mui-content-padded").on("tap","#forgetPwd",function () {
						openPage("./forgetPwd.html");
				});
				
				console.log("md5 密码 = " + md5("123456"))
					//账号密码登录
				$(".mui-content-padded").on("tap","#login",function () {
					if( !Pattern.isPhone( account.value ) ) {
						$.toast("请输入正确的手机号");
						return;
					}
					if( password.value == "" ) {
						$.toast("请输密码");
						return;
					}
					var params = {
							account : account.value ,
							password : md5( password.value )
					}; 
					 doc.activeElement.blur();
					 plus.nativeUI.showWaiting("加载中...");
					 app.login( params ).then(function ( res ) {
						 if( res.hasOwnProperty("success") && res.success ) {
						 		res.phone = account.value;
								plus.storage.setItem( "userInfo" , JSON.stringify( res ) );
								openPage("./index.html");
						 } else {
								mui.toast( res.errorMessage );
						 }  
						  plus.nativeUI.closeWaiting();
					 },function ( err ) {
						mui.toast( requestMsg.fail );
						plus.nativeUI.closeWaiting();
					 });
				});
		})
})( mui , document );

//$.plusReady(function() {
	//var isFirstLogin = plus.storage.getItem("username") == null;
	
	
// 	if( !isFirstLogin ) {
// 		if( plus.fingerprint.isSupport() && 
// 			plus.fingerprint.isKeyguardSecure() && 							plus.fingerprint.isEnrolledFingerprints() ) {
// 			//指纹识别	
// 			plus.fingerprint.authenticate(function () {
// 				openPage("./index.html");
// 			},function ( err ) {
// 				$.toast("指纹识别失败,请重试");
// 			},{ message : "请使用指纹识别" })
// 			//console.log("已有指纹识别");
// 		} else {
// 			console.log("未设置指纹识别")
// 		}
// 	} else {
// 		console.log("使用账号密码登录");
// 	}

	






//});