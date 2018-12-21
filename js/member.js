(function ( $ , doc ) {
	$.init({});
	
	$.plusReady(function () {
		var curr = plus.webview.currentWebview();
		var data = curr.data;


		$(".l1Vip")[0].textContent = data["comm"].length + "人";
		$(".l2Vip")[0].textContent = data["commVip"].length + "人";
		
		$(".mui-title")[0].textContent = curr.title;
	
		
		$(".funs-list").on("tap",".newpage-div",function () {
			var page = this.dataset.page;
			var title = this.dataset.title;
			var level = this.dataset.level;
			//console.log( JSON.stringify( data[level] ) ) 
			openPage( page , { data : data[level] , title : title });
		});
	})
})( mui , document );
