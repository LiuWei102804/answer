(function ( $ , doc ) {
		$.init({
			statusBarBackground: '#f7f7f7'
		});
		$.plusReady(function () {
				var currentWebview = plus.webview.currentWebview();
				var account = $("#account")[0];
				var password = $("#password")[0];
				
				
				currentWebview.addEventListener("show",function () {
					var all = plus.webview.all();
					for( var i = 0; i < all.length; i ++ ) {
							if( all[i].id == currentWebview.id ) {
									continue;
							}
							all[i].close("pop-out",0);
					}
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
									plus.storage.setItem( "userInfo" , JSON.stringify( res ) );
									openPage("./index.html");
							 } else {
									mui.toast( res.errorMessage );
							 }
							 //console.log( JSON.stringify( res ) )
								plus.nativeUI.closeWaiting();
						 },function ( err ) {
									mui.toast( requestMsg.fail );
									plus.nativeUI.closeWaiting();
						 });
						
						//plus.nativeUI.showWaiting();
					
				});
				
				//console.log( plus.storage.getItem("userInfo") )
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