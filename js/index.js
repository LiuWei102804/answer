var subpages = ["./pages/home.html","./pages/userCenter.html"];
mui.init({ 
	statusBarBackground: '#f7f7f7'
});
mui.plusReady(function () {
	for( var i = 0; i < subpages.length; i ++ ) {
		mui.openWindow({
			url: subpages[i],
			id: subpages[i],
			styles:{
				top:"0px" , //新页面顶部位置
				bottom:"52px" , //新页面底部位置
				width : "100%"
			},
			createNew:false ,
			show : {
				autoShow : i == 0 ? true : false ,
				aniShow  : "slide-in-right" 
			} ,
			waiting:{
			    autoShow:true,		//自动显示等待框，默认为true
			    title:'正在加载...',//等待对话框上显示的提示内容
			}
		});
	}
	var loginPage = plus.webview.getLaunchWebview();
	loginPage.hide();
	
	mui(".mui-bar-tab").on("tap",".mui-tab-item",function () {
		var current = this.dataset.page;

		var page = plus.webview.getWebviewById( current );
		page.show("slide-in-right",200,function () {
			
			hideSubPage( current );
										
			
		});
	});
	
//	plus.geolocation.getCurrentPosition(function ( pos ) {
//		//console.log( JSON.stringify( pos ) )
//	},function () {
//		
//	},{ provider : "baidu" , enableHighAccuracy : true , geocode : true })
});