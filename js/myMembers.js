(function ( $ , doc ) {
	$.init({});
	$.plusReady(function () {
		var curr = plus.webview.currentWebview();
		
		$(".mui-title")[0].textContent = curr.title;
	});
})( mui , document );

