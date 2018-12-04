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
		var currentWebview = plus.webview.currentWebview();
		var page = $.openWindow({
			url : "./myMembersChild.html" ,
			id : "./myMembersChild.html" ,
			extras : {
				data : currentWebview.data
			}
		})
		currentWebview.append( page );
	})

})( mui , document );

