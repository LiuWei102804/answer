function shareWeb( msg ) {
	/**
	 * 	测试系统分享
	 * 
	 */
	//plus.nativeUI.showWaiting();
	plus.share.sendWithSystem( msg , function(){
		//plus.nativeUI.alert("分享成功");
		//plus.nativeUI.closeWaiting();
	}, function(e){
		//plus.nativeUI.alert("分享失败");
		//plus.nativeUI.closeWaiting();
	});
}
