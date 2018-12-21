(function ( $ , doc ) {
	$.init({
// 		subpages : [{
// 			url : "./myMembersChild.html" ,
// 			id : "./myMembersChild.html" ,
// 			extras : {
// 				data : plus.webview.currentWebview().data
// 			}
// 		}]
	});
	$.plusReady(function () {
		var curr = plus.webview.currentWebview();
		
		//$(".mui-title")[0].textContent = curr.title;
		var page = $.openWindow({
			url : "./myMembersChild.html" ,
			id : "./myMembersChild.html" , 
			extras : { 
				data : curr.data ,
				title : curr.title
			}
		})
		curr.append( page );
	})

})( mui , document );

