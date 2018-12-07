(function ( $ , doc ) {
	var userInfo = null,
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
		var payAddress = "http://98qo.cn/demo/api_url/pay.php";
		var uid = plus.device.uuid;
		var total_fee = "88";
		var pay_title = encodeURI( "开通VIP" );
		var order_no = "000001";
		var appKey = "1724_d253ff22d9dbc28c3eb77d395056bbfe";
		payAddress += "?uid=" + uid + "&";
		payAddress += "total_fee=" + total_fee + "&";
		payAddress += "pay_title=" + pay_title + "&";
		payAddress += "order_no=" + order_no + "&";
		payAddress += "appkey=" + appKey;
		
		//console.log( payAddress )
		plus.runtime.openURL( payAddress , function ( err ) {
			mui.alert( "打开地址失败");
		},"com.tencent.mm");

	
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
				var data = res.data; 
				console.log( JSON.stringify( res.data ) ) 
				$(".nickName")[0].innerHTML = data.memberinfo.nickName;										//真实姓名
				$(".userId")[0].innerHTML = "ID:" + data.memberinfo.phone; 									//手机号码
				$(".dailyComm")[0].innerHTML = data.dailyComm || "0.00";									//今日收入（普通账户）
				$(".totalComm")[0].innerHTML = data.totalComm || "0.00";									//总收入	（普通账户）
				$(".totalwithdrawComm")[0].innerHTML = data.totalwithdrawComm || "0.00";					//总提现		（普通账户）
				$(".dailyVip")[0].innerHTML = data.dailyVip || "0.00";										//今日收入  (精英账户)
				$(".totalVip")[0].innerHTML = data.totalVip || "0.00";										//总收入   （精英账户）
				$(".totalwithdrawVip")[0].innerHTML = data.totalwithdrawVip || "0.00";						//总提现		（精英账户）				

				if( !qrCode ) {
					qrCode = new QRCode( qr , { 
						text : data.memberinfo.qrCode ,
						width : 25 ,
						height : 25
					})
				} else {
					//qrCode.clear();
					qrCode.makeCode( data.memberinfo.qrCode );
				}

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