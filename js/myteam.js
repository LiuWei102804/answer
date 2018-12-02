(function ( $ , doc ) {
	var data = null;
	$.init({
		
	});
	$.plusReady(function () {
		var userInfo = JSON.parse( plus.storage.getItem("userInfo") );
		$(".funs-list").on("tap",".newpage-div",function () {
			var page = this.dataset.page;
			var level = this.dataset.level;
			var t = this.dataset.title;

			openPage( page , { title : t , data : data[level] }); 
		});
		
		myTeams({ phone : "18918455233" });
		
	});
	
	/**
	 * 	获取团队信息 
	 */
	function myTeams( params ) {
		plus.nativeUI.showWaiting("加载中...");
		app.getMyTeam( params ).then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				data = res.data;
			} else {
				$.toast( res.errorMessage )
			}
			plus.nativeUI.closeWaiting();
		},function ( err ) { 
			$.toast( requestMsg.fail );
			plus.nativeUI.closeWaiting();
		});
	}
})( mui , document );