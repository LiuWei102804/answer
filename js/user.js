(function ( $ , doc ) {
	var params = {
		nickName  : "" ,
		realName : "" ,
		phone : "" ,
		personalSign : ""
	};
	$.init({});
	$.plusReady(function () {
		var userInfo = JSON.parse( plus.storage.getItem("userInfo") );
		var nickName = $(".nickName")[0];					//昵称
		var realName = $(".realName")[0];					//真实姓名
		var phone = mui(".phone")[0];						//手机号
		var personalSign = $(".personalSign")[0];			//手机号码
		
		
		if( Boolean( userInfo.realName ) ) {
			realName.value = userInfo.realName;
			realName.setAttribute("readonly","readonly");
		}
		if( Boolean( userInfo.nickName ) ) {
			nickName.value = userInfo.nickName;
		}
		if( Boolean( userInfo.personalSign ) ) {
			personalSign.value = userInfo.personalSign;
		}
		phone.value = userInfo.phone.encryptPhoneNumber();
		
		$(".mui-content").on("tap",".submit",function () {
			params.nickName = nickName.value;
			params.realName = realName.value;
			params.phone = userInfo.phone;
			params.personalSign = personalSign.value;
			updateInfo( params );
		})
	});
	 
	function updateInfo( {} , params ) {
		plus.nativeUI.showWaiting("加载中...");
		app.updateInfo( {} , params ).then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				$.alert("保存成功");
				plus.webview.currentWebview().reload();
				//$.back();
			} else {
				$.toast( requestMsg.fail );
			}
			plus.nativeUI.closeWaiting();
		},function ( err ) {
			plus.nativeUI.closeWaiting();
			$.toast( requestMsg.fail );
		});
	}
})( mui , document );
