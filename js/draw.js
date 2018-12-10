mui.init({});
mui.plusReady(function () {
	mui(".funs-list").on("tap",".newpage-div",function () {
		var page = this.dataset.page;
		var type = this.dataset.type;
		var t = this.dataset.title;
		if( page == "./apply.html" ) {
			app.checkDrawStatu().then(function ( res ) {
				if( res.hasOwnProperty("success") && res.success ) {
					console.log( JSON.stringify( res ) )
					//if( res.data.vipAllow ) {
						openPage( page , { title : t , data : res.data });
					//} else {
					//	mui.toast("请先升级 VIP");
					//}
				} else {
					mui.toast( res.errorMessage );
				}
			},function ( err ) {
				mui.toast( requestMsg.fail );
			})
		} else {
			openPage( page , { title : t , type : type });
		}
		
	});
});
