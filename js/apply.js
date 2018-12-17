(function ( $, doc ) {
	var data = {};
	var clipboard;
	var code;
	var bitmap = null
	$.init({
		 
	});
	
	$.plusReady(function () {
		var curr = plus.webview.currentWebview();
		var drawNum = $("input[type=number]")[0];
		var amountType = 0;											//默认普通钱包
		var radios = $("input[type=radio]");
		var tip = $(".tip")[0];
		var userInfo = JSON.parse( plus.storage.getItem("userInfo") );


 
		if( curr.wid ) { 
			plus.nativeUI.showWaiting("加载中...");
			app.getDrawLogById( { wid : curr.wid } ).then(function ( res ) {
				//console.log( JSON.stringify( res ) ) 
				if( res.hasOwnProperty("success") && res.success ) {
					 res.data.url += encodeURIComponent("&p=" + userInfo.memberinfo.phone); 
					downAppOrToWechat( res.data.url );
				} else {   
					$.toast( res.errorMessage );  
				}
				plus.nativeUI.closeWaiting();
			},function ( err ) {
				$.toast( err.message );  
				plus.nativeUI.closeWaiting();
			}) 
		}

		plus.nativeUI.showWaiting("加载中...");
		app.checkDrawStatu().then(function ( res ) {
			
			if( res.hasOwnProperty("success") && res.success ) {
				//console.log( JSON.stringify( res ) )
				data = res.data;
				$(".ordinary")[0].textContent = "余额:" + data["commAvaible"] + "元";
				$(".elite")[0].textContent = "余额:" + data["vipAvaible"] + "元";

			} else {
				$.toast( res.errorMessage );
			}
			plus.nativeUI.closeWaiting();
		},function ( err ) {
			$.toast( requestMsg.fail );
			plus.nativeUI.closeWaiting();
		});
		
		/**
		 * 	关闭遮罩
		 */
		$("body").on("tap",".tip",function () {
			if( !this.classList.contains("mui-hidden") ) {
				this.classList.add("mui-hidden");
			}
		})
		
		/**
		 * 	保存图片
		 */
		$(".tip").on("tap",".open",function () {
			
			bitmap = new plus.nativeObj.Bitmap(String(Date.parse( new Date())));
			curr.draw(bitmap,function(){
				bitmap.save("_doc/"+ Date.parse( new Date()) +".png", { format : "png" , clip : { top : "0px" } },function ( i ) {
					plus.gallery.save( i.target , function ( d ) {
						bitmap.clear(); 
						$.toast("保存图片成功");
						openWechat();
						
					},function ( e ) {
						bitmap.clear();
						$.toast("保存图片失败" + e.message );
					})
					
				})
			},function(e){
				console.log('绘制图片失败：'+JSON.stringify(e));
			});

		});

		/**	
		 * 	阻止冒泡
		 */
		$(".tip").on("tap","#qrcode,h4",function ( ev ) {
			ev.stopPropagation();
			return false;
		});

		$("#draw")[0].addEventListener("tap",function () {
			if( drawNum.value == "" ) {
				$.toast("请输入提现金额");
				return;
			};
			doc.activeElement.blur(); 
			if( drawNum.value <= 1 ) {
				$.toast("最低提现1元起");
				return;
			};
			/**
			 * 如果普通钱包，检查普通钱包余额够不够提现，否则检查精英钱包
			 */
			if( amountType == 0 ) {
				if( data["commAvaible"] < 100 ) {
					$.toast("普通账户满100元才可提现");
					return;
				}
				if( drawNum.value > data["commAvaible"] ) {
					$.toast("可用余额不足");
					return;
				}
			} else {
				if( drawNum.value > data["vipAvaible"] ) {
					$.toast("可用余额不足");
					return;
				}
			};


			var params = {
				amount : drawNum.value,
				amountType : amountType
			};	
			
			plus.nativeUI.showWaiting("加载中...");
			app.drawApply( {},params ).then(function ( res ) {
				//console.log( JSON.stringify( res ) )
				if( res.hasOwnProperty("success") && res.success ) {
					res.data.url += encodeURIComponent("&p=" + userInfo.memberinfo.phone); 
					downAppOrToWechat( res.data.url );
				} else {
					$.toast( res.errorMessage );
				}
				plus.nativeUI.closeWaiting();
			},function ( err ) {
				//console.log( JSON.stringify( err ) )
				$.toast( err.message );
				plus.nativeUI.closeWaiting();
			});
			


					
		},false);
		
		
			
		mui.each( radios , function ( index , item ) {
			item.onchange = function () {
				if( this.checked ) {
					amountType = this.value;
				}
			}
		});
		
		
		function downAppOrToWechat( url ) {
			if( tip.classList.contains("mui-hidden") ) {
				tip.classList.remove("mui-hidden")
			};
			//console.log( url )
			if( !code ) {
				code = new QRCode( doc.querySelector("#qrcode") , {  
					text : url ,
					width : 200 ,
					height : 200
				});
			} else {
				code.makeCode( url );
			}



//		   	clipboard = new ClipboardJS('#draw', {
//		        text: function() {
//		            return url;
//		        }
//		    });
//
//		    clipboard.on('success', function(e) {
//			    $.alert('申请成功,请在微信中粘贴地址并打开进行验证\n 提现链接请勿发送给其他人打开，否则不到账。',"提示",function () {
//					plus.runtime.launchApplication({ pname : "com.tencent.mm" , action :"weixin://" },function ( e ) {
//			        		$.confirm('检测到您未安装"微信",是否前往下载?',"提示",function ( btn ) {
//			        			if( btn.index == 1 ) {
//			        				if( $.os.ios ) {
//									plus.runtime.openURL("https://itunes.apple.com/cn/app/wei/id414478124");				        					
//			        				} else {
//									plus.runtime.openURL("http://android.myapp.com/myapp/detail.htm?apkName=com.tencent.mm");					        					
//			        				}
//			        			} else {
//								$.toast("取消下载微信");
//			        			}
//			        		})
//			        })
//					curr.reload();
//				})
//			    clipboard.destroy();
//		    });
//		
//		    clipboard.on('error', function(e) {
//		        $.alert('请在微信中打开"'+ url +'"',"提示",function () {
//		        	clipboard.destroy();
//		        });
//		        
//		    });
		};
		/**
		 * 	打开微信
		 */
		function openWechat() {
			//关闭遮罩
			if( !tip.classList.contains("mui-hidden") ) {
				tip.classList.add("mui-hidden"); 
			}
			//var action = $.os.ios ? "weixin://scanqrcode" : "weixin://dl/scan";
			plus.runtime.launchApplication({ pname : "com.tencent.mm" , action :"weixin://scanqrcode" },function ( e ) {
        		$.confirm('检测到您未安装"微信",是否前往下载?',"提示",function ( btn ) {
        			if( btn.index == 1 ) {
        				if( $.os.ios ) {
							plus.runtime.openURL("https://itunes.apple.com/cn/app/wei/id414478124");				       
        				} else {
							plus.runtime.openURL("http://android.myapp.com/myapp/detail.htm?apkName=com.tencent.mm");						
        				}
        			} else {
						$.toast("取消下载微信");
        			}
        		})
	        })
		}
	
	});
})( mui , document );