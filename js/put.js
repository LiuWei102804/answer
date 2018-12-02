(function ( $ , doc ){
	$.init({
		
	});
	$.plusReady(function () {
		var company = $(".company")[0];
		var task = $(".task")[0];
		var contact = $(".contact");
		var tel = $(".tel")[0];
		
		
		$(".mui-content").on("tap","#submit",function () {
			if( company.value == "" ) {
				$.toast("请填写公司名称");
				return;
			}
			if( task.value == "" ) {
				$.toast("请填写任务需求");
				return;
			}
			if( contact.value == "" ) {
				$.toast("请填写联系人名称");
				return;
			}
			if( !Pattern.isPhone( tel.value ) ) {
				$.toast("请填写正确的手机号");
				return;
			};
			var params = {
				companyName : company.value ,
				taskRequirement : task.value ,
				contact : contact.value ,
				contactTell : tel.value 
			};
			plus.nativeUI.showWaiting("加载中...");
			app.putTask( params ).then(function ( res ) {
				console.log( JSON.stringify(res  ) )
				if( res.hasOwnProperty("success") && res.success ) {
					
				} else {
					$.toast( requestMsg.fail );
				}
				plus.nativeUI.closeWaiting();
			},function ( err ) {
				plus.nativeUI.closeWaiting();
				$.toast( requestMsg.fail );
			});
		})
	})
})( mui , document );
 