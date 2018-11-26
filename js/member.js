mui.init({});
mui.plusReady(function () {
	var curr = plus.webview.currentWebview();
	mui(".mui-title")[0].textContent = curr.title;

	
	mui(".funs-list").on("tap",".newpage-div",function () {
		var page = this.dataset.page;
		openPage( page );
	});
});