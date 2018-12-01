mui.init({});
mui.plusReady(function () {
	mui(".funs-list").on("tap",".newpage-div",function () {
		var page = this.dataset.page;
		var type = this.dataset.type;
		var t = this.dataset.title;
		openPage( page , { title : t , type : type });
	});
});
