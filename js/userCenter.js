mui.init({});
mui.plusReady(function () {
	mui(".account-data").on("tap",".newpage-div",function () {
		var page = this.dataset.page;
		openPage( page );
	});
	
	
	var qr = mui("#qrcode")[0];
	var code = new QRCode( qr , { 
			text : "http://www.runoob.com" ,
			width : 25 ,
			height : 25
	})
	/*
	 	检查更新
	 	切换账号
	 * */
	mui(".account-data").on("tap",".func-div",function () {
		var func = this.dataset.func;
		changeAccount(func);
	});
	/*
	 	退出APP
	 * */
	mui(".account-data").on("tap",".quit-btn",function () {
		if( mui.os.ios ) {
			mui.alert("此平台不支持直接退出应用，请手动切换","提示");
		} else {
			mui.confirm("确认退出应用？","提示",function ( btn ) {
				if( btn.index == 1 ) {
					plus.runtime.quit();
				}
			})
			
		}
	});
	
	/*
	 	选择头像
	 * */
//				mui(".head").on("change","input",function () {
//					var fileRender = new FileReader();
//					fileRender.readAsDataURL(this.files[0]);
//					fileRender.onload = function() {
//			            //console.log(this.result);  // 上传的图片的编码
// 						mui("#user-pic")[0].setAttribute("src" , this.result );
// 						//console.log( e.target.src )
//			        };
//				});


	upLevel();
});

/*
 	升级VIP
 * */
function upLevel(){
	
};

/*
 	切换账号
 * */
function changeAccount( func ){
	if( func == "changeAccount" ) {
		mui.confirm("确定要切换账号吗?","提示","确定",function ( btn ) {
			if( btn.index == 0  ) {
				var loginPage = plus.webview.getLaunchWebview();
				loginPage.show("pop-in",200,function () {
					plus.webview.getWebviewById( "./index.html" ).close("pop-out",0);
					closeSubPage();
				});
			}
		})
	} else {
		plus.nativeUI.showWaiting();
		mui.later(function () {
			mui.toast("已经是最新版本");
			plus.nativeUI.closeWaiting();
		},2000)
	}
};