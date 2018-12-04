(function ( $ , doc ) {
	var userInfo = null;
	$.init({
		pullRefresh: {
			container: '#refreshContainer',
			down: {
				callback: getUserInfo
			}
		}
	});
	$.plusReady(function () {
		userInfo = JSON.parse( plus.storage.getItem("userInfo") );
		$(".account-data").on("tap",".newpage-div",function () {
			var page = this.dataset.page;
			openPage( page );
		});

		var qr = $("#qrcode")[0];
		var code = new QRCode( qr , { 
				text : "http://www.runoob.com" ,
				width : 25 ,
				height : 25
		})
		/*
		 	检查更新
		 	切换账号
		 * */
		$(".account-data").on("tap",".func-div",function () {
			var func = this.dataset.func;
			changeAccount(func);
		});
		/*
		 	退出APP
		 * */
		$(".account-data").on("tap",".quit-btn",function () {
			if( $.os.ios ) {
				$.alert("此平台不支持直接退出应用，请手动切换","提示");
			} else {
				$.confirm("确认退出应用？","提示",function ( btn ) {
					if( btn.index == 1 ) {
						plus.runtime.quit();
					}
				})
				
			}
		});
		
		$(".account-data").on("tap",".uplevel",function () {
			upLevel();
		});
			
		/**
		 * 	跳转个人推广页
		 */
		$(".mui-content").on("tap",".userCode",function () {
			openPage("./extension.html");
		})
		getUserInfo();
	});
	 /**
	  * 升级VIP
	  */
	function upLevel(){
//		if( plus.os.name.toLocaleLowerCase() == "ios" ) {
//			plus.runtime.openWeb("http://action-ing.com.cn/demo/api_url/pay.php?appkey=1726_f4b5f7c86bc844ecfcef23b6fef8dec9&uid=13&total_fee=2&pay_title=%E6%94%B6%E6%AC%BE%E4%BA%BA%E3%80%90%CA%9A%20%EF%A3%BF%20%C9%9E%E3%80%91&order_no=");
//		 } else {
			 			plus.runtime.openURL("http://action-ing.com.cn/demo/api_url/pay.php?appkey=1726_f4b5f7c86bc844ecfcef23b6fef8dec9&uid=13&total_fee=2&pay_title=%E6%94%B6%E6%AC%BE%E4%BA%BA%E3%80%90%CA%9A%20%EF%A3%BF%20%C9%9E%E3%80%91&order_no=",function ( err ) {
			 		mui.alert( JSON.stringify( err ) )
					$.confirm("检测到您未安装\"微信\",是否前往下载","提示",function ( btn ) {	
						if( btn.index == 1 ) {
							if( plus.os.name.toLocaleLowerCase() == "ios" ) {
								plus.runtime.openURL("https://itunes.apple.com/cn/app/wechat/id414478124?mt=8"); 
								
							} else {
								plus.runtime.openURL("https://weixin.qq.com/cgi-bin/readtemplate?t=w_down");
							}

						}  
					})  ;
			},"com.tencent.mm");
//		 }
	
	};
	
	/**
	 * 切换账号
	 */
	function changeAccount( func ){
		if( func == "changeAccount" ) {
			mui.confirm("确定要切换账号吗?","提示","确定",function ( btn ) {
				if( btn.index == 0  ) {
					var webView = plus.webview.getWebviewById("./index.html");
					webView.close("pop-out");
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
	
	/**
	 * 查询个人信息
	 */
	function getUserInfo() {
		app.getUserInfo().then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				var data = res.data.memberinfo; 
				console.log( JSON.stringify( data ) ) 
				$(".realName")[0].innerHTML = data.realName;
				$(".userId")[0].innerHTML = "ID:" + data.phone; 
				mui.extend( true , userInfo , data );
				//清除旧数据
				plus.storage.clear();
				plus.storage.setItem("userInfo",JSON.stringify( userInfo ));
			} else {
				$.toast( requestMsg.fail );
			}
			$('#refreshContainer').pullRefresh().endPulldownToRefresh();
		},function ( err ) {
			//console.log( $ )
			$('#refreshContainer').pullRefresh().endPulldownToRefresh();
			$.toast( requestMsg.fail );
		})
	} 
})( mui , document );