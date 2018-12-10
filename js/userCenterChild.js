(function ( $ , doc ) {
	var userInfo = {},
		qr = null,
		qrCode = null;
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

		/**
		 * 个人二维码
		 */
		qr = $("#qrcode")[0];

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
		if( userInfo.memberinfo.disUserType >= 1 ) {
			$.alert("您已经不是普通用户了,无需升级！");
			return;
		}
		var payAddress = "http://api.hxs823.cn/demo/api_url/pay.php";
		var uid = userInfo.memberinfo.phone;
		var total_fee = "2"; 
		var pay_title = encodeURI( "升级VIP" );
		var order_no = "order_" + Date.parse( new Date() );
		var appKey = "1726_f4b5f7c86bc844ecfcef23b6fef8dec9";
		var back_url = encodeURIComponent( "http://47.104.139.205:8000/api/v1/payCallback" );
		payAddress += "?uid=" + uid;
		payAddress += "&total_fee=" + total_fee;
		payAddress += "&pay_title=" + pay_title;
		payAddress += "&order_no=" + order_no;
		payAddress += "&appkey=" + appKey;
		payAddress += "&back_url=" + back_url;
//		 
//		//console.log( payAddress )
		plus.runtime.openWeb( payAddress , function ( err ) {
			mui.alert( "打开地址失败");
		});
		//openPage("./upLevel.html");
	
	};
	
	/**
	 * 切换账号
	 */
	function changeAccount( func ){
		if( func == "changeAccount" ) {
			mui.confirm("确定要切换账号吗?","提示","确定",function ( btn ) {
				if( btn.index == 0  ) {
					plus.storage.removeItem("userInfo");
					var webView = plus.webview.getWebviewById("./index.html");
					webView.close("pop-out");
				}
			})
		} else {
			plus.nativeUI.showWaiting("检查更新..");
			mui.later(function () {
				mui.toast("已经是最新版本");
				plus.nativeUI.closeWaiting();
			},3000)
		}
	};
	
	/**
	 * 查询个人信息
	 */
	function getUserInfo() {
		app.getUserInfo().then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				var data = res.data;  
				var userType = "";
				switch( Number( data.memberinfo.disUserType ) ) {
//					case 0 :
//						userType = "普通用户";
//						break;
					case 1 :
						userType = "精英调查员";
						break;
					case 2 :
						userType = "特约调查员";
						break;
					case 3 :
						userType = "A级调查员";
						break;
					case 4 :
						userType = "S级调查员";
						break;
					default :
						userType = "普通用户";  
					
				}
				$(".nickName")[0].innerHTML = Boolean( data.memberinfo.nickName ) ?  data.memberinfo.nickName : data.memberinfo.phone.encryptPhoneNumber();										//真实姓名
				//$(".avatar")[0].src = data.avatar;
				$(".userId")[0].innerHTML = "ID:" + data.memberinfo.phone.encryptPhoneNumber(); 									//手机号码
				$(".dailyComm")[0].innerHTML = data.dailyComm || "0.00";									//今日收入（普通账户）
				$(".totalComm")[0].innerHTML = data.totalComm || "0.00";									//总收入	（普通账户）
				$(".totalwithdrawComm")[0].innerHTML = data.totalwithdrawComm || "0.00";					//总提现		（普通账户）
				$(".dailyVip")[0].innerHTML = data.dailyVip || "0.00";										//今日收入  (精英账户)
				$(".totalVip")[0].innerHTML = data.totalVip || "0.00";										//总收入   （精英账户）
				$(".totalwithdrawVip")[0].innerHTML = data.totalwithdrawVip || "0.00";	//总提现		（精英账户）
				$(".userType")[0].innerHTML = "(" + userType + ")";

				if( !qrCode ) {
					qrCode = new QRCode( qr , { 
						text : "http://47.104.139.205:8000/indexh5?code=" + data.invitionCode ,
						width : 25 ,
						height : 25
					})
				} else {
					//qrCode.clear();
					qrCode.makeCode( data.memberinfo.qrCode );
				}

				$.extend( true , userInfo , data );
				//清除旧数据
				//plus.storage.clear();
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