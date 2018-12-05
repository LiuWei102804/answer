(function ( $, doc ) {
	$.init({
		
	});
	
	$.plusReady(function () {
		var curr = plus.webview.currentWebview();
		var data = curr.data;
		var drawNum = $("input[type=number]")[0];
		var amountType = 0;											//默认普通钱包
		var radios = $("input[type=radio]");
		
		$(".ordinary")[0].textContent = "余额:" + data["commAvaible"] + "元";
		$(".elite")[0].textContent = "余额:" + data["vipAvaible"] + "元";

		
		$(".mui-content").on("tap","#draw",function () {
			if( drawNum.value == "" ) {
				$.toast("请输入提现金额");
				return;
			};
			doc.activeElement.blur(); 
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
			} 

			var params = {
				amount : drawNum.value,
				amountType : amountType
			};
			plus.nativeUI.showWaiting("加载中...");
			app.drawApply( params ).then(function ( res ) {
				console.log( JSON.stringify( res ) )
				if( res.hasOwnProperty("success") && res.success ) {
					$.toast("申请成功");
				} else {
					$.toast( requestMsg.fail );
				}
				plus.nativeUI.closeWaiting();
			},function ( err ) {
				//console.log( JSON.stringify( err ) )
				$.toast( err.message );
				plus.nativeUI.closeWaiting();
			})
		});
		
		
			
		mui.each( radios , function ( index , item ) {
			item.onchange = function () {
				if( this.checked ) {
					amountType = this.value;
				}
			}
		})
	});
})( mui , document );