(function ( $ , doc ) {
// 	var old_back = mui.back;
// 	$.back = function () {
// 		var parent = plus.webview.getWebviewById("./index.html");
// 		//console.log( JSON.stringify( parent ) )
// 		$.fire( parent , "customBack" , { tab : "./pages/userCenter.html" } );
// 		old_back();
// 	}
	$.init({
		pullRefresh : {
			container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		    down : {
		      style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
	//	      color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
	//	      height:'50px',//可选,默认50px.下拉刷新控件的高度,
	//	      range:'100px', //可选 默认100px,控件可下拉拖拽的范围
	//	      offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
	//	      auto: false,//可选,默认false.首次加载自动上拉刷新一次
		      callback : getUserInfo //function () {				//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
// 		      	setTimeout(function () {
// 		      		mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
// 		      	},2000)
		     // } 
		    }
		} ,
		//statusBarBackground: '#fd7d24'
	});
	$.plusReady(function () {
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
		
		

		getUserInfo();
	});
	 /*
	 	升级VIP
	 * */
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
	
	/*
		查询个人信息
	*/
	function getUserInfo() {
		//console.log( params )
		app.getUserInfo({ phone : "18918455233" }).then(function ( res ) {
				if( res.hasOwnProperty("success") && res.success ) {
					var data = res.data; 
					//console.log( JSON.stringify( data ))
						$(".realName")[0].innerHTML = data.realName;
						$(".userId")[0].innerHTML = "ID:" + data.phone;
				} else {
						$.toast( requestMsg.fail );
				}
				$('#refreshContainer').pullRefresh().endPulldownToRefresh();
		},function ( err ) {
				$('#refreshContainer').pullRefresh().endPulldownToRefresh();
				$.toast( requestMsg.fail );
		})
	}
}( mui , document ));



