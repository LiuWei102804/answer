(function ( $ , doc ) {
	var msgId = "",
		isSend = false;			//是否已发送验证码
	$.init({
		
	});
	$.plusReady(function () {
		var account = $("#account")[0];
		var password = $("#password")[0];
		var confirmPwd = $("#confirmPwd")[0];
		var code = $("#code")[0]; 

		$(".mui-content-padded").on("tap","#reg",function () {
			var params = {
				phone : account.value ,
				password : password.value ,
				authCode : code.value
			};
			if( !Pattern.isPhone( params.phone ) ) {
				$.toast("请输入正确的手机号");
				return;
			}
			if( !Pattern.isNumber( params.authCode , 6 , 6 ) ) {
				$.toast("请输入6位数字验证码");
				return;
			}
			if( !Pattern.isEnglishAndNumber( params.password , 6 , 20 ) ) {
				$.toast("登录密码请使用6-20位数字加字母组合");
				return;
			}
			if( !Pattern.isEnglishAndNumber( confirmPwd.value , 6 , 20 ) ) {
				$.toast("确认密码请使用6-20位数字加字母组合");
				return;
			}
			if( params.password != confirmPwd.value ) {
				$.toast("两次密码输入不一致,请重新输入");
				return;
			}
			doc.activeElement.blur();
			params.msg_id = msgId;
			plus.nativeUI.showWaiting("加载中...");
			params.password = md5( params.password );
			app.updatePwd( params ).then(function ( res ) { 
				//console.log( JSON.stringify( res ) )
				if( res.hasOwnProperty("success") && res.success ) {
					$.fire( plus.webview.getLaunchWebview() , "regback" , { account : params.account , password : password.value });
					$.alert("注册成功,即将返回登录","提示","确认",function () {
						$.back();
					},"div");
					try{
						$.later(function () {
							$.back();
							$.closePopup();
						},3000);
					} catch ( e ) {

					}
					
					//plus.storage.setItem("userInfo" , JSON.stringify( res ));
					//openPage("./index.html");
				} else {
					$.toast( res.errorMessage );
				}
				plus.nativeUI.closeWaiting();
			},function ( err ) {
				plus.nativeUI.closeWaiting();
				$.toast( requestMsg.fail );
			});
		})
		/**
		 * 	发送验证码
		 */
	   $(".mui-content").on("tap","#getCode",function () {
			if( isSend ) {
				return;
			}
			if( !Pattern.isPhone( account.value ) ) {
				$.toast("请输入正确的手机号");
				return;
			}
			plus.nativeUI.showWaiting("加载中...");
		   app.sendCode({ phone : account.value }).then(function ( res ) {
		   	console.log( JSON.stringify( res ) )
				if( res.hasOwnProperty("success") && res.success ) {
					msgId = res.data;
					$.toast("发送成功");
					isSend = true;
					var time = 60;
					$("#getCode")[0].innerHTML = time + "s";
					var t = setInterval(function () {
						time --;
						if( time <= 0 ) {
							clearInterval( t );
							isSend = false;
							$("#getCode")[0].innerHTML = "获取";
						} else {
							$("#getCode")[0].innerHTML = time + "s";
						}
					},1000);	
				} else {
					$.toast( res.errorMessage );
				}
				plus.nativeUI.closeWaiting();
		   },function ( err ) {
				$.toast( requestMsg.fail );
				plus.nativeUI.closeWaiting();
		   })
	   })
	});
})( mui , document );