(function ( $ , doc ) {
	/*
	 	分享参数
	 * */
	var msg = {
		title : "趣任务" ,
		content : "邀朋友一起趣任务，每天8元，更有无限红包等你来拿。" ,
		href : "https://www.pgyer.com/alfd" ,
		smallImg : "_www/Icon-72.png"
	};
	var wc = null,bitmap = null;
	$.init({
		gestureConfig : {
			longtap : true
		}
	});
	$.plusReady(function () {
		var qr = mui("#qrcode")[0];
		var userInfo = JSON.parse( plus.storage.getItem("userInfo") );

		var code = new QRCode( qr , {  
			text : userInfo.memberinfo.qrCode ,
			width : 108 ,
			height : 108
		});
		var html = "";
		for( var i = 0; i < userInfo.memberinfo.invitionCode.length; i ++ ) {
			html += "<b>"+ userInfo.memberinfo.invitionCode[i] +"</b>";
		}
		$(".code")[0].innerHTML = html;
		
		getServices();
		
		$(".mui-bar-nav").on("tap",".share",function ( evt ) {
			shareWeb( msg );
		});
		
		
		doc.addEventListener("longtap",function(){
			plus.nativeUI.actionSheet({title:'保存图片',cancel:'取消',buttons:[{ title : "保存图片" }]}, function( e ) {
				if( e.index == 1 ) {
					wc = plus.webview.currentWebview();
					bitmap = new plus.nativeObj.Bitmap(String(Date.parse( new Date())));
					wc.draw(bitmap,function(){
						bitmap.save("_doc/"+ Date.parse( new Date()) +".png", { format : "png" },function ( i ) {
							plus.gallery.save( i.target , function ( d ) {
								bitmap.clear();
								$.toast("保存图片成功");
							},function ( e ) {
								bitmap.clear();
								$.toast("保存图片失败" + e.message );
							})
							
						})
					},function(e){
						console.log('绘制图片失败：'+JSON.stringify(e));
					});
				}
			})
		}); 
	});
})( mui , document );
