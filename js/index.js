(function ( $ , doc ) {
	var subpages = ["./pages/userCenter.html","./pages/home.html"];
	var currPage = null;
	var hasPage = {};
	$.init({ 
	    preloadPages : [{  
		        url:'./pages/userCenter.html',  
		        id:'./pages/userCenter.html',  
		        styles:{
			        top:'0px',
			        bottom:'52px'  
		        }  
		    }
	    ]
	});
	$.plusReady(function () {
		var currentWebview = plus.webview.currentWebview();
		
		//alert(plus.navigator.isImmersedStatusbar());

//console.log( plus.storage.key(0) )
//console.log( plus.storage.key(1) )
//console.log( plus.storage.key(2) )
//console.log( JSON.stringify( plus.storage.getItem("qsInfo0") ) )
//console.log( JSON.stringify( plus.storage.getItem("qsInfo1") ) )
//console.log( JSON.stringify( plus.storage.getItem("userInfo") ) )
//plus.runtime.launchApplication({ pname : "com.tencent.mm" , action : "weixin://dl/businessWebview/link/" , extra : { url : "https://www.baidu.com" }  },function () { 
//	 
//})
		currPage = $.openWindow({
			url:'./pages/home.html',   
			id:'./pages/home.html',  
			styles:{  
				top:'0px',  
				bottom:'52px'  
			} ,
			createNew : false ,
			show : {
				autoShow : true ,
				aniShow : "pop-in" ,
				duration : 0 
			} ,
			waiting : {
				autoShow : true ,
				title : "正在加载...."
			} 
		});
		currentWebview.append( currPage );
		hasPage[currPage.id] = currPage.id;

		$(".mui-tab-item").each(function ( index , elem ) {

			elem.addEventListener("tap",function () {
				var dataPage = plus.webview.getWebviewById( this.dataset.page );
				if( currPage.id == dataPage.id ) { 
					return; 
				}
				if( !hasPage[dataPage.id] ) {
					hasPage[dataPage.id] = dataPage.id;
					currentWebview.append( dataPage );
				}
				dataPage.show();
				currPage.hide();
				currPage = dataPage;
			})
		});
		
		

	});
	
	

	
	
})( mui , document );
