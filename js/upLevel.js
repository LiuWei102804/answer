(function ( $ , doc ) {
	$.init({
		
	});
	$.plusReady(function () {
		var sign = "appkey=1726_f4b5f7c86bc844ecfcef23b6fef8dec9&order_no=00001&secretkey=f46da9a097c42c20974dcb13d977914d&total_fee=2&uid=13857102804&";
		console.log( md5( sign ) )
		
//		fast_pay.get_openid({
//			pay_title : "支付测试" ,
//			success : function ( data ) {
//				console.log( "支付测试" , JSON.stringify( data ) )
//			}
//		})
		fast_pay.shows_qr({
			appkey: '1726_f4b5f7c86bc844ecfcef23b6fef8dec9', //填写网站生成的appkey
			//pay_type: "gren_qr" ,
			uid: "13857102804",				//付款用户id
			total_fee: "2",					//付款金额
			pay_title: "支付测试",			//支付标题
			order_no: "00001",				//你网站的订单号
			sign: md5( sign ),				//签名
			//请看下面 
			me_param: "",//其他参数
		  	qr_load:function(data){
		  		new QRCode( doc.querySelector('#qrcode'), {
		  			text : data.qr ,
		  			width : 108 ,
					height : 108
		  		})
		  		console.log(data);//获取支付二维码,可自定义弹出二维码或者跳转,如果无,则默认弹出二维码样式,你可以利用这个自定义二维码页面样式
		  	},
		  	success:function(data){
		    		console.log(JSON.stringify( data ));
		  		//支付成功后返回,你也可以在这里ajax更新网站订单,安全性自己处理,也可以使用异步回调
		  	}
		});
	})
})( mui , document );




