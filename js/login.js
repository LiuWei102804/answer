mui.init({
	statusBarBackground: '#f7f7f7'
});
mui.plusReady(function() {
	var isFirstLogin = plus.storage.getItem("username") == null;
	var currentWebview = plus.webview.currentWebview();
	
	if( !isFirstLogin ) {
		if( plus.fingerprint.isSupport() && 
			plus.fingerprint.isKeyguardSecure() && 							plus.fingerprint.isEnrolledFingerprints() ) {
			//指纹识别	
			plus.fingerprint.authenticate(function () {
				openPage("./index.html");
			},function ( err ) {
				mui.toast("指纹识别失败,请重试");
			},{ message : "请使用指纹识别" })
			//console.log("已有指纹识别");
		} else {
			console.log("未设置指纹识别")
		}
	} else {
		console.log("使用账号密码登录");
	}

	
	currentWebview.addEventListener("show",function () {
		var all = plus.webview.all();
		for( var i = 0; i < all.length; i ++ ) {
			if( all[i].id == currentWebview.id ) {
				continue;
			}
			all[i].close("pop-out",0);
		}
	},false);


	//账号密码登录
	mui(".mui-content-padded").on("tap","#login",function () {
//		var account = document.querySelector("#account");
//		var password = document.querySelector("#password");
//		//plus.storage.setItem("username" , account.value );
//		plus.storage.clear();
//		mui.each(mui("input"),function ( index , item ){
//			item.blur();
//		})
		//plus.nativeUI.showWaiting();
		//setTimeout(function () {
			openPage("./index.html");
		//	plus.nativeUI.closeWaiting();
		//},2000)
		
	});
	
	/*
	 	切换注册
	 * */
	mui(".mui-content-padded").on("tap","#reg",function () {
		openPage("./reg.html");
	});
	/*
	 	验证码登录
	 * */
	mui(".mui-content-padded").on("tap","#loginByCode",function () {
		var forms = document.forms;
		if( forms[1].classList ) {
			if( forms[1].classList.contains("mui-hidden") ) {
				forms[1].classList.remove("mui-hidden");
				forms[0].classList.add("mui-hidden");
				mui("#loginByCode")[0].innerHTML = "账号登录";
			} else {
				forms[0].classList.remove("mui-hidden");
				forms[1].classList.add("mui-hidden");
				mui("#loginByCode")[0].innerHTML = "验证码登录";
			}
		} else {
			
		}
	});
	/*
		忘记密码
	*/
   mui(".mui-content-padded").on("tap","#forgetPwd",function () {
	   openPage("./forgetPwd.html");
   });
});