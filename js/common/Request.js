(function ( $ , w ) {
	var uuid = null;
	$.plusReady(function () {
		uuid = plus.device.uuid;
		w.ajax = function (url , data , method ) { 
			var promise = new Promise(function (resolve,reject) {
				if( !navigator.onLine ) {
					reject({ code : 10086 , msg : "网络连接已断开" });
					return;
				};
				var headers = {
					UUID : uuid 
				};
				if( plus.storage.getItem("userInfo") != null ) {
					headers.token = JSON.parse( plus.storage.getItem("userInfo") ).token;
				}
				$.ajax({
					type: method ,
					dataType:'json',				//服务器返回json格式数据
					url: url ,						//请求地址
					async : false ,
					data : data ,
					timeout : 3000 ,
					crossDomain : true ,
					headers : headers , 
					success : function ( res ) {
						resolve( res );
					} ,
					error : function ( err ) {
						reject( err );
					}
				});
			});
			return promise;
		}
		w.Post = function ( url , data ) {
			return w.ajax( url , data , "post" );
		};
		w.Get = function ( url , data ) {
			return w.ajax( url , data , "get" );
		};
	});
})(mui,window);
