(function ( $ , doc ) {
	var params = {
		phone : "18918455233" , 
		type : ""
	};
	$.init({
		pullRefresh : {
			container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			down : {
			  style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
			  callback : function () {
				  getDrawLog( params );
			  }
			},
			up : {
			  //height:50,//可选.默认50.触发上拉加载拖动距离
			  //auto:true,//可选,默认false.自动上拉加载一次
			  contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
			  contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
			  callback : function () {
				  this.endPullupToRefresh(false);
			  } 
			}
		} ,
	});
	$.plusReady(function () {
		var curr = plus.webview.currentWebview();
		var type = curr.type;
		params.type = type;
		
		getDrawLog( params );
	});
	
	/*
		查询提现记录
	*/
   function getDrawLog( params ) {
		plus.nativeUI.showWaiting("加载中...");
		app.getDrawLog( params ).then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				console.log( JSON.stringify( res ) )
			} else {
				mui.toast( requestMsg.fail );
			}
			plus.nativeUI.closeWaiting();
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		},function ( err ) {
			mui.toast( requestMsg.fail );
			plus.nativeUI.closeWaiting();
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		})
   };
})( mui , document );