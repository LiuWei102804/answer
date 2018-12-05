(function ( $ , doc ) {
	$.init({
		pullRefresh: {
			container: '#refreshContainer',
			down: {
				callback: getMembers
			}
		}
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
						"					<span class=\"nickName\">"+ item.disUserName +"</span>" + 
						"					<small class=\"mui-pull-right inviteTime\">邀请时间:"+ item.addTime +"</small>" +	
						"				</div>" + 
						"				<div>" +
						"					<small class=\"userId\">("+ String( item.disModelId ).encryptPhoneNumber() +")</small>" + 
						"					<small class=\"mui-pull-right addTime\">添加时间:"+ item.addTime +"0</small>"
						"				</div>" + 
						"			</li>";
			});
			$(".mui-table-view")[0].innerHTML = html;
			plus.nativeUI.closeWaiting();
		} else {
			$(".empty-data")[0].classList.remove("mui-hidden");
			$(".mui-table-view")[0].classList.add("mui-hidden");
		}

	});
	
	function getMembers() {
		setTimeout(function () {
			$('#refreshContainer').pullRefresh().endPulldownToRefresh();
		},2000)
	}
})( mui , document );

