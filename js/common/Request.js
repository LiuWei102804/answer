(function ( $ , w ) {
	var uuid = null,userInfo = null;
	$.plusReady(function () {
		userInfo = JSON.parse( plus.storage.getItem("userInfo") );
		
		uuid = plus.device.uuid;
		
		w.ajax = function (url , data , method ) { 
			//console.log( uuid )
			var promise = new Promise(function (resolve,reject) {
				if( !navigator.onLine ) {
					reject({ code : 10086 , msg : "网络连接已断开" });
					return;
				};
				var headers = {
					UUID : uuid 
					//token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY0MTg5MzQ0NTIsInBheWxvYWQiOiJcIjE1MjU5ODg4MDAwYTY5YmNiYjMtOGI3ZC00ZTk4LWI4OTMtNmU5YzYyMTAzMTAyXCIifQ.8S3a9CISX7EBZH9XRlW2zKIJSGcNEYa9XLvuO4A2GGI"
				};
				//data.phone = "18918455233";
				//console.log( userInfo.hasOwnProperty("data") ) 
				if( userInfo && userInfo.hasOwnProperty("data") ) {
					headers.token = userInfo.data;
				}
				$.ajax({
					type: method ,
					dataType:'json',				//服务器返回json格式数据
					url: url ,						//请求地址
					async : true ,
					data : data ,
					timeout : 3000 ,
					crossDomain : true ,
					headers : headers , 
					success : function ( res ) {
						resolve( res );
					} ,
					error : function ( err ) { 
						console.error( "request call err " + err.message );
						reject( err );
					}
				});
			});
			return promise;
		}
		w.Post = function ( url , data ) {
			if( url.indexOf("/api/v1/reginit.api") > -1 && url.indexOf("/api/v1/login.api") > -1 ) {
				url += "?phone=" + userInfo.phone;
			}
			return w.ajax( url , data , "post" );
		};
		w.Get = function ( url , data ) { 
			var _data = data ? data : {}; 
			_data.phone = userInfo.phone;

			return w.ajax( url , _data , "get" );
		};
		
		
		/**
		 * 	监听网络断开
		 * 
		 */
		document.addEventListener("netchange", function () {
			var nt = plus.networkinfo.getCurrentType();
			switch ( nt ) {
				case plus.networkinfo.CONNECTION_CELL2G :
				case plus.networkinfo.CONNECTION_CELL3G :
					plus.nativeUI.toast("当前网络状态不佳",{ duration : "long" });
					break;
				case plus.networkinfo.CONNECTION_NONE :
					plus.nativeUI.alert("当前网络连接已断开,请检查网络");
					break;
				default :
			}
		}, false );
	});
})(mui,window);
