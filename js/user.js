(function ( $ , doc ) {
	var params = {
		nickName  : "" ,
		realName : "" ,
		phone : "" ,
		personalSign : ""
	};
	var userInfo = null;
	$.init({
		
	});
	$.plusReady(function () {
		userInfo = JSON.parse( plus.storage.getItem("userInfo") );
		var memberinfo = userInfo.memberinfo;
		var nickName = $(".nickName")[0];					//昵称
		var realName = $(".realName")[0];					//真实姓名
		var phone = mui(".phone")[0];						//手机号
		var personalSign = $(".personalSign")[0];			//手机号码
		
		
		//console.log( JSON.stringify( userInfo ) )
		if( Boolean( memberinfo.realName ) ) {
			realName.value = memberinfo.realName;
			realName.setAttribute("readonly","readonly");
			realName.style.setProperty("color","#aaa");
		}
		if( Boolean( memberinfo.nickName ) ) {
			nickName.value = memberinfo.nickName;
		}
		if( Boolean( memberinfo.personalSign ) ) {
			personalSign.value = memberinfo.personalSign;
		}
		phone.value = memberinfo.phone.encryptPhoneNumber();
		
		$(".mui-content").on("tap",".submit",function () {
			params.nickName = nickName.value;
			params.realName = realName.value;
			params.phone = memberinfo.phone;
			params.personalSign = personalSign.value;
			updateInfo( params );
		})
	});
	 
	function updateInfo( params ) {
		plus.nativeUI.showWaiting("加载中...");
		app.updateInfo( {} , params ).then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				//$.extend( true , userInfo.memberinfo , res.data );
				//plus.storage.setItem("userInfo",JSON.stringify(userInfo));
				$.fire( plus.webview.getWebviewById("./userCenterChild.html") , "update" , params )
				$.alert("保存成功");
			} else { 
				$.toast( res.errorMessage );
			}
			plus.nativeUI.closeWaiting();
		},function ( err ) {
			plus.nativeUI.closeWaiting();
			$.toast( requestMsg.fail );
		}).catch(function ( e ) {
			console.log( JSON.stringify( e ) )
		});
	}
})( mui , document );
