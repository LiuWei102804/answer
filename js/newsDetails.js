(function ( $ , doc ) {
	$.init({
		
	});
	$.plusReady(function () {
		var currentWebview = plus.webview.currentWebview();
		var newsText = currentWebview.newsText;
		
		$(".newsTitle")[0].innerHTML = newsText.title;
		$(".newsText")[0].innerHTML = newsText.content;
		$(".time")[0].innerHTML = newsText.createtime;
		
		//console.log( JSON.stringify( newsText ) )
	});
})( mui, document );
