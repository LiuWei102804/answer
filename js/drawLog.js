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
			  auto: true,//可选,默认false.自动上拉加载一次
			  contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
			  contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
			  callback : function () {
			  		setTimeout(getLogs,0)
			  }
			}
		}
	});
	$.plusReady(function () {
		var curr = plus.webview.currentWebview();
		var type = curr.type;

		params.type = type;

		$(".mui-title")[0].innerHTML = curr.title;
	});
	
	/*
		查询提现记录  
	*/
   function getLogs() {
   		if( !loading ) {
   			return;
   		}
   		var html = "";
   		loading = false;
		app.getDrawLog( params ).then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				var data = res.data; 
				dataList = dataList.concat( data );
				if( data instanceof Array ) {
					if( data.length ) {
						$.each( data , function ( index , item ) {
							html += "<li class=\"mui-table-view-cell flex\"><b>"+ item.withdrawNum +"</b><b>"+ ( String( item.withdrawTime ).split(" ")[0] ) +"</b><b>￥"+ item.totalAmount +"</b></li>";
						});
						$(".data-list")[0].innerHTML += html;
						if( data.length < params.size ) {
							isEnd = true;
						} else {
							params.current += 1; 
						}
					} else {
						isEnd = true;
					}
				}

			} else {
				$.toast( res.errorMessage );
			}
			$('#refreshContainer').pullRefresh().endPullupToRefresh(isEnd);
			loading = true;
		},function ( err ) {
			$.toast( requestMsg.fail );
			$('#refreshContainer').pullRefresh().endPullupToRefresh(isEnd);
			loading = true;
		}).catch(function ( e ) {
			consoele.log( JSON.stringify( e ) )
		})
   };
})( mui , document );