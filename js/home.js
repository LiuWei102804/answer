(function ( $ , doc ) {
	var newsList = [];
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

			var index = null;
			if( typeof this.dataset.index  != "undefined" ) {
					index = this.dataset.index;
			}

			if( index ) {
				openPage( page , { index : index , current : index } );
			} else {
				openPage( page );
			}
			
		}); 
		
		/**
		 * 	跳转新闻资讯
		 */
		$(".mui-content").on("tap",".newsPage",function () {
			var index = this.dataset.index;
			var page = this.dataset.page;
			//console.log( page )
			openPage( page ,{ newsText : newsList[index] } ); 
		});
		
		//console.log( plus.navigator.isImmersedStatusbar() )


	}); 
	/*
		查询新闻咨询
	*/
   function getNews( obj ) {
	   app.getNews().then(function ( res ) {
		   if( res.hasOwnProperty("success") && res.success ) {
			   newsList = res.data;
			   if( newsList instanceof Array ) {
				   var html = "";
				   for( var i = 0; i < newsList.length; i ++ ) {
					   html += "<small class=\"newsPage\" data-index=\""+ i +"\" data-page=\"./newsDetails.html\">"+ newsList[i].title +"</small>";
				   }
				   obj.innerHTML = html;
				   runNews( obj );  
			   } else {
				   $.toast( requestMsg.fail );
			   }
		   } else {
			   $.toast( res.errorMessage );
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
