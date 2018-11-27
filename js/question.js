var old_back = mui.back;
mui.back = function () {
	mui.confirm("确认退出答题系统?","提示","确认",function ( btn ) {
		if( btn.index == 0 ) {
			old_back();
		};
	});
};

var ans = {};
mui.init({

});
mui.plusReady(function () {
	var user = plus.storage.getItem("username") || "游客";
	var content = mui(".content")[0];
	var qsIndex = 1;

	
	mui(".username")[0].innerHTML = "您好：" + user ;
	setContent( content , qsIndex );

	
	
	/*
	 	下一题
	 * */
	mui(".mui-content-padded").on("tap",".qs-next",function () {
		var radio = mui("input[type=radio]");
		mui.each( radio , function ( index, item ) {
			if( item.checked ) {
				ans[qsIndex] = {
					q : QS[qsIndex].q ,
					a : item.value 
				};
			}
			
		});
		qsIndex += 1;
		setContent( content , qsIndex );
	});
	/*
	 	退出系统
	 * */
	mui(".mui-content-padded").on("tap",".qs-quit",function () {
		mui.back();
	});
});


function setContent( ctx , qsIndex){
	if( !QS[qsIndex] ) {
		mui.alert("答题结束");
		return;
	}
	var qs = QS[qsIndex];
	var as = qs.a; 
	ctx.innerHTML = qs.q;
	for( var i = 0; i < as.length; i ++ ) {
		var html = "<div class=\"mui-input-row mui-radio mui-left\">" +
						"<label>"+ as[i] +"</label>" + 
						"<input name=\"radio\" type=\"radio\" value=\""+ as[i] +"\" />" + 
					"</div>";
					
		ctx.innerHTML += html;
	};
}
