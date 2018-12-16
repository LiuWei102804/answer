(function ( $ , doc ) {
	var params = {
		current : 1 ,
		size : 15 
	};
	var dataList = [];
	var isEnd = false;
	var loading = true;
	var powerFlagList = [];				//获取已答列表标识
	var downRefresh = false;
	$.init({
		pullRefresh : {
			container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		    up : {
		      height:50,//可选.默认50.触发上拉加载拖动距离
		      auto: true ,//可选,默认false.自动上拉加载一次
		      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
		      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
		      callback : function ()  {		//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		      		setTimeout(getTaskList,0)
		      }		
		       		
		    } ,
		    down : {
		    		callback: downToRefresh
		    }
		}
	});
	$.plusReady(function () {
		//getTaskList();
		$(".data-list").on("tap",".newpage-div",function () {
			var index = this.dataset.index;
			var isOpen = this.children[1].dataset.open;
			if( isOpen == 1 ) {
				openPage("./question.html",{ index : index , current : index , question : [dataList[index]] });
				
			} else {
				$.alert("今日已答过该答卷！","提示");
			}
		});
		
		/**
		 * 	监听注册返回
		 */
		doc.addEventListener("rewardBack",function ( event ) {
			var index = event.detail.index;
			
			$(".newpage-div")[index].children[1].className = "mui-pull-right end";
			$(".newpage-div")[index].children[1].innerHTML = "(已答)";
			$(".newpage-div")[index].children[1].setAttribute("data-open","0");
		},false);
		
		
	});
	/**
	 *	下拉刷新 
	 */
	function downToRefresh() {
		//$('#refreshContainer').pullRefresh().refresh(true);
		$(".data-list")[0].innerHTML = "";
		params.current = 1;
		isEnd = false;
		dataList = []; 
		downRefresh = true;

		getTaskList();

	};
	
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
				//console.log( JSON.stringify( data ) )
				dataList = dataList.concat( data ); 
				if( data instanceof Array ) {
					if( data.length ) { 
						$.each( data , function ( index , item ) { 
							//console.log( JSON.stringify( item ) )
							html += "<li class=\"mui-table-view-cell newpage-div\" data-index=\""+ ($(".data-list")[0].children.length + index ) +"\"  data-survey-id=\""+ item.surveyId +"\"><span class=\"mui-pull-left\">"+ item.title +"</span></li>";
							//console.log( JSON.stringify( item ) )
						});
						$(".data-list")[0].innerHTML += html;


						//if( !powerFlagList.length ) {
							getQusPowerList( data );	
						//} else {
						//	setIdent( powerFlagList );
						//}	
					} 
					/**
					 * 	如果是上拉加载
					 */
					if( !downRefresh ) {
						if( data.length < params.size ) {
							$('#refreshContainer').pullRefresh().endPullupToRefresh( true );
						} else {
							params.current += 1; 
							$('#refreshContainer').pullRefresh().endPullupToRefresh();
						};
					} else {
						$('#refreshContainer').pullRefresh().endPulldownToRefresh();
						$('#refreshContainer').pullRefresh().enablePullupToRefresh();
					}
				}

			} else {
				$.toast( res.errorMessage );
			};


			downRefresh = false;
			
			loading = true;
		},function ( err ) { 
			$.toast( requestMsg.fail );
			if( !downRefresh ) {
				$('#refreshContainer').pullRefresh().endPullupToRefresh();
			} else {
				$('#refreshContainer').pullRefresh().endPulldownToRefresh();
				$('#refreshContainer').pullRefresh().enablePullupToRefresh();	
			};

			downRefresh = false;
			
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
					powerFlagList = res.data;
					setIdent( powerFlagList );
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
		//console.log( JSON.stringify( data ) )
		$(".newpage-div").each( function( key , elem ) {
			var ident = this.dataset.surveyId;
			var statu = "";
			var color = "";
			var isOpen = "0";
			 	
			if( data.indexOf( Number( ident )) > -1 ) {
				statu = "(已答)";
				color = "end";
				isOpen = "0";
			} else {
				statu = "(未答)";
				color = "begin";
				isOpen = "1";
			}
			if( elem.children.length < 2 ) {
				elem.innerHTML += "<small class=\"mui-pull-right "+ color +"\" data-open=\""+ isOpen +"\">"+ statu +"</small>";
			}

			
		});
	};
})( mui , document );
 