(function ( $ , doc ) {
	var params = {
		type : "" ,
		current : 1 ,
		size : 15
	};
	var dataList = [];
	var isEnd = false;
	var loading = true;
	$.init({
		pullRefresh : {
			container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			up : {
			  height:50,//可选.默认50.触发上拉加载拖动距离
			  auto: false,//可选,默认false.自动上拉加载一次
			  contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
			  contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
			  callback : function () {
			  		//setTimeout(getLogs,0)
			  }
			}
		}
	});
	$.plusReady(function () {
		var currentWebview = plus.webview.currentWebview();
		var title = currentWebview.title;
		
		$(".mui-title")[0].innerHTML = title;
	});
})( mui , document );
