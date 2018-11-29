mui.init({
	pullRefresh : {
		container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    down : {
	      style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
//	      color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
//	      height:'50px',//可选,默认50px.下拉刷新控件的高度,
//	      range:'100px', //可选 默认100px,控件可下拉拖拽的范围
//	      offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
//	      auto: false,//可选,默认false.首次加载自动上拉刷新一次
	      callback : function () {				//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	      	setTimeout(function () {
	      		mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
	      	},2000)
	      } 
	    }
	} ,
	statusBarBackground: '#f7f7f7'
});
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