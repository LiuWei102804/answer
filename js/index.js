(function ( $ , doc ) {
	var subpages = ["./pages/home.html","./pages/userCenter.html"];
	var currPage = null;
	$.init({ 
	//	subpages:[{  
	//          url:'./pages/home.html',  
	//          id:'./pages/home.html',  
	//          styles:{  
	//              top:'0px',  
	//              bottom:'52px'  
	//          }  
	//      }  
	//  ], 
	    preloadPages : [{  
		        url:'./pages/userCenter.html',  
		        id:'./pages/userCenter.html',  
		        styles:{
			        top:'0px',
			        bottom:'52px'  
		        }  
		    } , {  
	            url:'./pages/home.html',  
	            id:'./pages/home.html',  
	            styles:{  
	                top:'0px',  
	                bottom:'52px'  
	            }  
	        } 
	    ]
	});
	$.plusReady(function () {
		plus.device.setWakelock( true );
		
		for( var i = 0; i < subpages.length; i ++ ) {
			var page = $.openWindow({
				url : subpages[i] ,
				id : subpages[i] ,
				createNew : false ,
				styles : {
					top : "0px" ,  
					bottom : "52px"
				} ,
				show : {
					autoShow : i == 0 ? true : false ,
					aniShow : "pop-in" ,
					duration : 0 
				} ,
				waiting : {
					autoShow : true ,
					title : "正在加载...."
				} ,
			});
			if( i == 0 ) {
				currPage = page;
			}
			plus.webview.currentWebview().append( page );
		};
		
		
		var loginPage = plus.webview.getLaunchWebview();
		loginPage.hide();
		
		$(".$-tab-item").each(function ( index , elem ) {
			elem.addEventListener("tap",function () {
				var dataPage = plus.webview.getWebviewById( this.dataset.page );
				dataPage.show();
				currPage.hide();
				currPage = dataPage;
			})
		});
	});
})( mui , document );
