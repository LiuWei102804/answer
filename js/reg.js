(function ( $ , doc ) {
	var msgId = "",
		isSend = false;			//是否已发送验证码
	$.init({
	
	});
	
	$.plusReady(function () {
		var account = $("#account")[0];
		var password = $("#password")[0];
		var code = $("#code")[0]; 
		var invitationCode = $(".invitationCode")[0];

		$(".mui-content-padded").on("tap","#reg",function () {
			var params = {
				account : account.value ,
				password : password.value ,
				authCode : code.value , 
				invitationCode : invitationCode.value
			};
			if( !Pattern.isPhone( params.account ) ) {
				$.toast("请输入正确的手机号");
				return;
			};
			if( !Pattern.isNumber( params.authCode , 6 , 6 ) ) {
				$.toast("请输入验证码");
				return;
			};
			if( !Pattern.isEnglishAndNumber( params.password , 6 , 20 ) ) {
				$.toast("请使用6-20位数字加字母组合");
				return;
			};
			if( Pattern.isSpace( params.invitationCode , true ) == "" ) {
				$.toast("请填写邀请码");
				return;
			};
			doc.activeElement.blur();
			params.msg_id = msgId;
			params.password = md5( params.password );
			plus.nativeUI.showWaiting("加载中...");

			app.reg( params ).then(function ( res ) {
				if( res.hasOwnProperty("success") && res.success ) {
					//console.log( JSON.stringify( res ) )
					//plus.storage.setItem("userInfo" , JSON.stringify( res ));

					$.alert("注册成功,即将返回登录","提示","确认",function () {
						$.back();
					},"div");
					try{
						$.fire( plus.webview.getLaunchWebview() , "regback" , { account : params.account , password : password.value });
						
						$.later(function () {
							$.back();
							$.closePopup();
						},3000)
					} catch ( e ) {

					}

					
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
		
		/*
			发送验证码
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
		   	//console.log( JSON.stringify( res ) )
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
		

	})
})( mui , document );
