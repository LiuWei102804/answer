mui.init({});
mui.plusReady(function () {
	mui(".funs-list").on("tap",".newpage-div",function () {
		var page = this.dataset.page;
		var t = this.dataset.title;
		openPage( page , { title : t });
	});
});
