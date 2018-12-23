(function ( $ , doc ) {
		$.init({
// 			preloadPages : [{
// 				url:"./index.html" ,
// 			    id:"./index.html" ,
// 			    styles:{
// 			    	top : 0 ,
// 			    	bottom : 0
// 			    } //窗口参数
// //			    //extras:{},//自定义扩展参数
// //			    //subpages:[{},{}]//预加载页面的子页面
// 			}] ,
			//statusBarBackground: '#f7f7f7'
		});
		$.plusReady(function () {
				var currentWebview = plus.webview.currentWebview();
				var userInfo = plus.storage.getItem("userInfo");
				var account = $("#account")[0];
				var password = $("#password")[0];


				if( userInfo != null ) {
					openPage("./index.html");
				}
				currentWebview.addEventListener("show",function () {
					var all = plus.webview.all();
					for( var i = 0; i < all.length; i ++ ) {
							if( all[i].id == currentWebview.id ) {
								continue;
							}
							all[i].close("pop-out",0);
					}

					//console.log(1)
				},false);
				/*
					切换注册
				* */
				$(".mui-content-padded").on("tap","#reg",function () {
					openPage("./reg.html");
				});
				/*
					忘记密码
				*/
				$(".mui-content-padded").on("tap","#forgetPwd",function () {
					openPage("./forgetPwd.html");
				});
				
					//账号密码登录
				$(".mui-content-padded").on("tap","#login",function () {
					if( !Pattern.isPhone( account.value ) ) {
						$.toast("请输入正确的手机号");
						return;
					}
					if( password.value == "" ) {
						$.toast("请输密码");
						return;
					}
					var params = {
						account : account.value ,
						password : md5( password.value )
					}; 
					 doc.activeElement.blur();
					 $("#login").button("loading");
								//openPage("./index.html");
					 //plus.nativeUI.showWaiting("加载中...");
					 app.login( params ).then(function ( res ) {
						 if( res.hasOwnProperty("success") && res.success ) {
						 		res.phone = account.value;
						 		//console.log("登录时最新 token ： " , res.data )
								plus.storage.setItem( "userInfo" , JSON.stringify( res ) );
								openPage("./index.html");
						 } else {
								mui.toast( res.errorMessage );
						 }  
						 $("#login").button("reset");
						  //plus.nativeUI.closeWaiting();
					 },function ( err ) {
					 	$("#login").button("reset");
						mui.toast( requestMsg.fail );
						//plus.nativeUI.closeWaiting();
					 });
				});
				
				
				/**
				 * 	监听注册返回
				 */
				doc.addEventListener("regback",function ( event ) {
					var detail = event.detail;
					
					account.value = detail.account;
					password.value = detail.password;
				},false);
		})
})( mui , document );