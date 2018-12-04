(function ( $ , doc ) {
	$.init({
			preloadPages : [{
					url : "./notOpen.html" ,
					id : "./notOpen.html" ,
					styles : {
							top : "0px" ,
							bottom : "0px"
					}
			}]
	})
	$.plusReady(function () {
	// 				var gallery = $('.$-slider'); 
	// 				gallery.slider({
	// 					interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
	// 				});
		
		var newsDiv = $(".news div")[0];
		getNews(newsDiv);  

		if( plus.os.name.toLocaleLowerCase() == "android" ) {
			plus.nativeUI.closeWaiting();
		}
	
	
		$(".account-class").on("tap",".newpage-div",function () {
			var page = this.dataset.page;
			openPage( page );
		}); 
		
		//console.log( plus.navigator.isImmersedStatusbar() )


	}); 
	/*
		查询新闻咨询
	*/
   function getNews( obj ) {
	   app.getNews().then(function ( res ) {
		   if( res.hasOwnProperty("success") && res.success ) {
			   var data = res.data;
			   if( data instanceof Array ) {
				   var html = "";
				   for( var i = 0; i < data.length; i ++ ) {
					   html += "<small>"+ data[i].title +"</small>";
				   }
				   obj.innerHTML = html;
				   runNews( obj );  
			   } else {
				   $.toast( requestMsg.fail );
			   }
		   } else {
			   $.toast( requestMsg.fail );
		   }
	   },function ( err ) {
		   $.toast( requestMsg.fail );
	   });
   };
   
   /*
		滚动咨询
   */
  function runNews( elem ) {
		var maxLength = elem.children.length;
		var height = elem.parentNode.offsetHeight;
		var index = 0,run = 0; 

		elem.innerHTML += elem.innerHTML;
		var t = setInterval(function () { 
			index ++;  
			
		    Animate.run( elem , { translate : [0, -( index * height ) ] },function () {
		        if( index >= maxLength ) {
		            index = 0;
		            Animate.run( elem , { translate : [0, 0 ] } , 0 );
		        }
		    })

		},3000);
  }
})( mui , document );
