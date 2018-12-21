(function ( $ , doc ) {
	var userInfo = {},
		qr = null,
		qrCode = null;
	var refreshNum = 5;
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
			var title = this.dataset.title;
			if( title ) {
				//console.log( this.dataset.walletType )
				openPage( page , { title : title , walletType : this.dataset.walletType , flag : this.dataset.flag });
			} else { 
				if( page == "./draw.html" && userInfo.memberinfo.realName == "" ) {
					$.alert("风险账号,请先绑定真实姓名");
					return;
				}
				openPage( page );
			}
			
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
		};
		plus.nativeUI.showWaiting("加载中...");
		app.getPayUrl().then(function ( res ) {
			//console.log( JSON.stringify( res ) )
			if( res.hasOwnProperty("success") && res.success ) {
				var data = Pattern.isSpace( res.data , true );
				
				//console.log( res.data )
				plus.runtime.openWeb( data );
			} else {
				$.toast( res.errorMessage );
			}
			plus.nativeUI.closeWaiting();
		},function ( err ) {
			$.toast( requestMsg.fail );
			plus.nativeUI.closeWaiting();
		})

		//openPage("./upLevel.html");
	
	};
	
	/**
	 * 切换账号
	 */
	function changeAccount( func ){
		if( func == "changeAccount" ) {
			mui.confirm("确定要切换账号吗?","提示",["取消","确定"],function ( btn ) {
				//console.log( btn.index )
				if( btn.index == 1  ) {  
					plus.storage.removeItem("userInfo");
					var webView = plus.webview.getWebviewById("./index.html");
					webView.close("pop-out");
				}
			})
		} else {
			
			/**
			 * 	检查应用版本信息
			 */
			plus.runtime.getProperty( plus.runtime.appid , function ( info ) {
				checkUpdate( info.version )
			});
		}
	};
	/**
	 * 	检查更新信息
	 */
	
	function checkUpdate( ver ) {
		var checkUpdateUrl = "http://156.237.129.242:8081/checkUpdate.json?_="+Date.parse(new Date());
		plus.nativeUI.showWaiting("检查更新..");	
		$.ajax({
			url : checkUpdateUrl ,
			type : "get" ,
			async : true , 
			crossDomain : true ,
			success : function ( res ) { 
				if( res.autoUpdate && res.version > ver ) {
					$.confirm( "确定下载更新？", "检测到新版本", ["取消","下载"] , function(e){
						if( e.index == 1 ){
							downWgt( res );	// 下载wgt资源包
						}else{
						
						}
					} );
				} else {
					$.toast("当前版本为最新版本！");
				}
				plus.nativeUI.closeWaiting();
			} ,
			error : function ( err ) {
				plus.nativeUI.closeWaiting();
				$.toast("更新信息检查失败,请重试");
			}
		})
	};
	/**
	 *	下载更新 
	 */
	
	function downWgt( updateInfo ){
		var wgtUrl = "http://156.237.129.242:8081/H5BE3FBA0.wgt?_="+Date.parse(new Date());
		plus.nativeUI.showWaiting("下载更新");
		plus.downloader.createDownload( wgtUrl , {filename:"_doc/update/"}, function(d,status){
			if ( status == 200 ) { 
				installWgt(d.filename);	// 安装wgt资源包
			} else {
				//console.log("下载更新失败！");
				$.toast("下载更新失败！");
//				$.confirm("是否前往下载最新版安装包？","下载更新失败",["取消","确定"],function ( btn ) {					
//					if( btn.index == 1 ) {
//						var newUrl = $.os.ios ? updateInfo.ios : updateInfo.android;
//						plus.runtime.openURL( newUrl );
//					}
//					
//				})
			}
			plus.nativeUI.closeWaiting();
		}).start();
	};
	/**
	 * 	安装更新
	 */
	function installWgt(path){
		plus.nativeUI.showWaiting("安装更新");
		plus.runtime.install(path,{},function(){
			plus.nativeUI.closeWaiting();
			//console.log("安装更新成功！");
			plus.nativeUI.alert("更新完成,点击确定重启应用！",function(){
			//  更新完成后重启应用
				plus.runtime.restart();
			});
		},function(e){
			plus.nativeUI.closeWaiting();
			//console.log("安装更新失败！["+e.code+"]："+e.message);
			$.toast("安装更新失败！");
		});
	}
	
	/**
	 * 查询个人信息
	 */
	var t = null;
	function getUserInfo() {
		if( refreshNum < 5 ) {
			//console.log('不可刷新');
			$('#refreshContainer').pullRefresh().endPulldownToRefresh();
			return;
		};
		//console.log("进行刷新");
		clearInterval( t );
		t = setInterval(function () {
			refreshNum --;
			if( refreshNum <= 0 ) {
				clearInterval( t );
				refreshNum = 5; 
				//console.log("释放刷新")
			}
		},1000);

		app.getUserInfo().then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				var data = res.data;   
				var userType = "";
				console.log( JSON.stringify( data ) )
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
				$(".userId")[0].innerHTML = "ID:" + data.memberinfo.id; 						 			//手机号码
				$(".dailyComm")[0].innerHTML = data.dailyComm || "0.00";									//今日收入（普通账户）
				$(".totalComm")[0].innerHTML = data.totalComm || "0.00";									//总收入	（普通账户）
				$(".totalwithdrawComm")[0].innerHTML = data.totalwithdrawComm || "0.00";					//总提现		（普通账户）
				$(".dailyVip")[0].innerHTML = data.dailyVip || "0.00";										//今日收入  (精英账户)
				$(".totalVip")[0].innerHTML = data.totalVip || "0.00";										//总收入   （精英账户）
				$(".totalwithdrawVip")[0].innerHTML = data.totalwithdrawVip || "0.00";	//总提现		（精英账户）
				$(".userType")[0].innerHTML = "(" + userType + ")";
				$(".commAvail")[0].innerHTML = "￥" + data["commAvail"] || "0.00"; 
				$(".vipAvail")[0].innerHTML = "￥" + data["vipAvail"] || "0.00";

				if( !qrCode ) { 
					qrCode = new QRCode( $("#qrcode")[0] , "http://www.78mx.cn/static/statics/index.html?code=" + data.memberinfo.invitionCode )
				} else {
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
		});
		
		/**
		 * 	监听修改资料
		 */
		doc.addEventListener("update",function ( event) {
			plus.webview.currentWebview().reload();
		}, false);



	} 
})( mui , document ); 