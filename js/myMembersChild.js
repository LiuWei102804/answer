(function ( $ , doc ) {
	var params = {
		type : "1" ,
		current : 1 ,
		size : 3
	};
	var dataList = [];
	var isEnd = false;
	var loading = true;
	var downRefresh = false;
	$.init({
//		pullRefresh: {
//			container: '#refreshContainer',
//			down : {
//				callback : getMembers
//			} ,
//			up: {
//				height:50,//可选.默认50.触发上拉加载拖动距离
//			  	auto:true,//可选,默认false.自动上拉加载一次
//			 	contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
//			  	contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
//			  	callback : function () {
//			  		setTimeout(getMembers,0);
//			  	}
//			}
//		}
	});
	$.plusReady(function () {
		var curr = plus.webview.currentWebview();
		var data = curr.data; 
		
		$(".mui-title")[0].textContent = curr.title;
		plus.nativeUI.showWaiting("加载中...");
		if( data.length > 0 ) { 
			var html = "";
			$.each( data ,function ( index , item ) {
				html += "<li class=\"mui-table-view-cell\">" +
						"				<div>" + 
						"					<span class=\"nickName\">"+ ( Boolean( item.realName ) ? item.realName : item.disUserName ) +"</span>" + 	
						"				</div>" + 
						"				<div>" +
						"					<small class=\"userId\">("+ String( item.phone ) +")</small>" + 
						"					<small class=\"mui-pull-right addTime\">添加时间:"+ item.addTime +"</small>"
						"				</div>" + 
						"			</li>";
			});
			$(".mui-table-view")[0].innerHTML = html;
		} else {
			$(".empty-data")[0].classList.remove("mui-hidden");
			$(".mui-table-view")[0].classList.add("mui-hidden");
		}
		plus.nativeUI.closeWaiting();

	});
	/**
	 * 
	 */
//	function downToRefresh() {
//		$(".data-list")[0].innerHTML = "";
//		params.current = 1;
//		isEnd = false;
//		dataList = []; 
//		downRefresh = true;
//
//		getMembers();
//	};
	/**
	 *	查询团队列表数据 
	 */
//	function getMembers() {
//		app.getDrawLog( params ).then(function ( res ) {
//			if( res.hasOwnProperty("success") && res.success ) {
//				var data = res.data;
//				dataList = dataList.concat( data ); 
//				/**
//				 * 	如果是上拉加载
//				 */
//				if( !downRefresh ) {
//					if( data.length < params.size ) {
//						$('#refreshContainer').pullRefresh().endPullupToRefresh( true );
//					} else {
//						params.current += 1; 
//						$('#refreshContainer').pullRefresh().endPullupToRefresh();
//					};
//				} else {
//					$('#refreshContainer').pullRefresh().endPulldownToRefresh();
//					$('#refreshContainer').pullRefresh().enablePullupToRefresh();
//				}
//			} else {
//				$.toast( res.errorMessage );
//			}
//			downRefresh = false;
//			loading = true;
//		},function ( err ) {
//			$.toast( requestMsg.fail );
//			if( !downRefresh ) {
//				$('#refreshContainer').pullRefresh().endPullupToRefresh();
//			} else {
//				$('#refreshContainer').pullRefresh().endPulldownToRefresh();
//				$('#refreshContainer').pullRefresh().enablePullupToRefresh();	
//			};
//
//			downRefresh = false;
//			loading = true;
//		}).catch(function ( e ) {
//			console.log( JSON.stringify( e ) )
//		});
//	}
})( mui , document );

