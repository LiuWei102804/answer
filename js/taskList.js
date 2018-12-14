(function ( $ , doc ) {
	var params = {
		current : 1 ,
		size : 15 
	};
	var dataList = [];
	var isEnd = false;
	var loading = true;
	var powerFlag = false;				//获取已答列表标识
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
			openPage("./question.html",{ index : index , current : index , question : [dataList[index]] });
		});
		
		
	});
	
	function getTaskList() { 
		if( !loading ) {
			return;
		}
		loading = false;
		var html = "";
		app.getQuestions( params ).then(function ( res ) {
			//console.log( JSON.stringify( res ) )
			if( res.hasOwnProperty("success") && res.success ) {
				var data = res.data;
				dataList = dataList.concat( data ); 
				if( data instanceof Array ) {
					if( data.length ) { 
						$.each( data , function ( index , item ) { 
							//console.log( JSON.stringify( item ) )
							html += "<li class=\"mui-table-view-cell newpage-div\" data-index=\""+ ($(".data-list")[0].children.length + index ) +"\"  data-survey-id=\""+ item.surveyId +"\"><span class=\"mui-pull-left\">"+ item.title +"</span></li>";
							//console.log( JSON.stringify( item ) )
						});
						$(".data-list")[0].innerHTML += html;
						if( data.length < params.size ) {
							isEnd = true;
						} else {
							params.current += 1; 
						};
						if( !powerFlag ) {
							getQusPowerList( data );	
						} else {
							setIdent( data );
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
			console.log( e )
		})
	};
		/**
	 * 	获取已答列表
	 */
	function getQusPowerList() {
		//plus.nativeUI.showWaiting("加载中...");
		//$(".mui-title")[0].innerHTML = item.title;
		app.getSurveyHistory().then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				if( res.data instanceof Array ) { 
					setIdent( res.data );
				} else {
					$.toast( requestMsg.fail );	
				}
				powerFlag = true;
			} else {
				$.toast( res.errorMessage );
			}
			//plus.nativeUI.closeWaiting();
		},function ( err ) {
			//plus.nativeUI.closeWaiting();
			$.toast( requestMsg.fail );
		});
	};
	/**
	 * 	设置标识
	 */
	function setIdent( data ) {
		$(".newpage-div").each( function( key , elem ) {
			var ident = this.dataset.surveyId;
			var statu = "";
			var color = "";
			//console.log( ident ) 
			$.each( data , function( index , id ) {
				if( id == ident ) {
					statu = "(已答)";
					color = "end";
				} else {
					statu = "(未答)";
					color = "begin";
				}
			});
			if( elem.children.length < 2 ) {
				elem.innerHTML += "<small class=\"mui-pull-right "+ color +"\">"+ statu +"</small>";
			}
			
		});
	};
})( mui , document );
 