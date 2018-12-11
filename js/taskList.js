(function ( $ , doc ) {
	var params = {
		current : 1 ,
		size : 10
	};
	var dataList = [];
	var isEnd = false;
	$.init({
		pullRefresh : {
			container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		    up : {
		      height:50,//可选.默认50.触发上拉加载拖动距离
		      auto: true ,//可选,默认false.自动上拉加载一次
		      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
		      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
		      callback :  function() {		//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		      		setTimeout(getTaskList,0);
		      } 		
		    }
		}
	});
	$.plusReady(function () {
		//getTaskList();
		$(".data-list").on("tap",".newpage-div",function () {
			var index = this.dataset.index;
			openPage("./question.html",{ index : index , current : index });
		})
	});
	
	function getTaskList() { 
		var html = "";
		app.getQuestions( params ).then(function ( res ) {
			//console.log( JSON.stringify( res ) )
			if( res.hasOwnProperty("success") && res.success ) {
				var data = res.data;
				dataList = dataList.concat( data ); 
				if( data.length ) {
					$.each( data , function ( index , item ) {
						html += "<li class=\"mui-table-view-cell newpage-div\" data-index=\""+ ($(".data-list")[0].children.length + index ) +"\">"+ item.title +"</li>";
						//console.log( JSON.stringify( item ) )
					});
					$(".data-list")[0].innerHTML += html;
					if( data.length < params.size ) {
						isEnd = true;
					} else {
						params.current += 1; 
					}
				} else {
					if( dataList.length < 1 ) { 
						$(".data-list")[0].classList.add("mui-hidden");
						$(".empty-data")[0].classList.remove("mui-hidden");
					}
				}
			} else {
				$.toast( res.errorMessage );
			}
			$('#refreshContainer').pullRefresh().endPullupToRefresh(isEnd);
		},function ( err ) {
			$.toast( requestMsg.fail );
			$('#refreshContainer').pullRefresh().endPullupToRefresh(isEnd); 
		}).catch(function ( e ) {
			console.log( e )
		})
	};
})( mui , document );
 