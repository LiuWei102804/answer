(function ( $ , w ) {
	var uuid = null,
		userInfo = null,
		offLineTip = false;
	$.plusReady(function () {
		userInfo = JSON.parse( plus.storage.getItem("userInfo") );

		uuid = plus.device.uuid; 
		//console.log( JSON.stringify( userInfo ) )
		//plus.storage.clear();
		w.ajax = function (url , data , method ) { 
			var promise = new Promise(function (resolve,reject) {
				if( !navigator.onLine ) {
					if( !offLineTip ) {
						$.alert( "网络连接已断开" ,function () {
							offLineTip = true;
						});
					}

					reject({ code : 10086 , msg : "网络连接已断开" });
					return;
				};
				var headers = {  
					"UUID" : uuid 
				};
				if( userInfo && userInfo.hasOwnProperty("data") ) {
					headers.token = userInfo.data;
				};  
				if( method == "post" ) {
					headers["Content-Type"] = "application/json";
				} 
				$.ajax({
					type: method ,
					dataType:'json',				//服务器返回json格式数据
					url: url ,						//请求地址
					async : true ,
					data : data ,
					timeout : 30000 ,
					crossDomain : true ,
					headers : headers , 
					success : function ( res ) {
						resolve( res );
					} ,
					error : function ( err ) { 
//						for( var e in err ) {
//							console.log( e , err[e])
//						}
						//console.log( err.responseText )
						console.error( "request call err " + err.readyState );
						reject( err );
					}
				});
			});
			return promise;
		}
		w.Post = function ( url , params , data ) {
			var _data = typeof data != "undefined" ? data : {};
			var _params = "?";
			if( url.indexOf("/api/v1/reginit.api") == -1 && 					//注册接口
				url.indexOf("/api/v1/login.api") == -1 &&					//登录接口			
				url.indexOf("/api/v1/updatePwd.api") == -1 ) {				//找回密码
				_params += "phone=" + userInfo.phone + "&";
			}; 
			for( var p in params ) {
				_params += p + "=" + params[p] + "&";
			};
			if( _params.length > 1 ) {
				_params = _params.substring( 0 , _params.length - 1 );
				url += _params;
			};
//			console.log( "Post url " , url ) 
//			console.log( JSON.stringify( _data ) )
			return w.ajax( url , _data , "post" ); 
		};
		w.Get = function ( url , data ) { 
			var _data = typeof data != "undefined" ? data : {};
			if( url.indexOf("/api/v1/authCode") == -1 ) {					//发送验证码
				_data.phone = userInfo.phone;
			}
//			console.log( "GET url = " , url );
//			console.log( JSON.stringify( _data ) )
			return w.ajax( url , _data , "get" );
		};
		
		
		/**
		 * 	监听网络断开
		 * 
		 */
		document.addEventListener("netchange", function () {
			var nt = plus.networkinfo.getCurrentType();
			switch ( nt ) {
				case plus.networkinfo.CONNECTION_NONE :
					//plus.nativeUI.toast("当前网络连接已断开,请检查网络");
					break;
				default :
					offLineTip = false;
			}
		}, false );
	});
})(mui,window);
