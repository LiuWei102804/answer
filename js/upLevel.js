mui.init({});
mui.plusReady(function () {

	var code = document.querySelector("#qrcode");
	new QRCode( code , {
		text : "http://www.runoob.com" ,
		width : 158 , 
		height : 158 
	});
//	
//	plus.gallery.save("https://www.baidu.com/img/baidu_jgylogo3.gif",function ( event ) {
//		
//	},function ( err ) {
//		console.log( JSON.stringify( err ) )
//	})
});



