(function ( $ , doc ) {
	var old_back = mui.back;
	mui.back = function () {
		mui.confirm("确认退出问卷调研?","提示","确认",function ( btn ) {
			if( btn.index == 0 ) {
				old_back();
			};
		});
	};	
	var ans = {},			//答题提交数据
		qus = [],			//答卷列表
		qusIndex = 0,		//问卷索引
		typeIndex = 1,		//问卷类型索引
		toDayMaxPartake = 10,//剩余答题次数
		end = false,		//答题结束
		isChoice = false;		// 是否有选中
	var content = null,		//问卷标题
		ans = null,			//选项列表
		nextBtn = null,		//提交按钮	
		input = null,
		qsClass = null;		//选项类型
	$.init({
	
	});
	$.plusReady(function () {
		var user = JSON.parse( plus.storage.getItem("userInfo") ).nickname || "游客";
		
		content = $(".content")[0];
		qsClass = $(".qs-class")[0];
		ans = $(".ans")[0];
		nextBtn = $(".qs-next")[0];
		
		$(".username")[0].innerHTML = "您好：" + user;  
		$(".over")[0].innerHTML = "剩余答题次数：" + toDayMaxPartake;
	
		
		
		/*
		 	下一题
		 * */
		$(".mui-content-padded").on("tap",".qs-next",function () {
			if( toDayMaxPartake <= 0 ) {
				mui.alert("今日答题活动已达上限");
				return;
			}
			/**
			 * 答卷结束
			 */
			if( end ) {
				$.alert("提交答卷");
				return;
			};

			if( !isChoice ) {
				$.alert("请至少选择一项");
				return;
			}
			input = $("input[type]");
			$.each( input , function ( index, item ) {
				if( item.checked ) { 
//					ans[qsIndex] = {
//						q : QS[qusIndex].q ,
//						a : item.value 
//					};

				}
			});
			qusIndex += 1;
			setContent( qus[typeIndex].question[qusIndex] );
			isChoice = false;
			toDayMaxPartake -= 1;
			$(".over")[0].innerHTML = "剩余答题次数：" + toDayMaxPartake;
		});
		/**
		 * 	input 框选中
		 */
		$(".mui-content").on("change","input",function () {
			if( this.checked ) {
				isChoice = true;
			} else {
				isChoice = false;
			}
		})
		/*
		 	退出系统
		 * */
		$(".mui-content-padded").on("tap",".qs-quit",function () {
			$.back();
		});
		/**
		 * 	查询答卷
		 */
		getQus();
	});
	
	
	function setContent( ctx ){
		if( typeof qus[typeIndex].question[qusIndex + 1] == "undefined" ) {
			nextBtn.innerHTML = "提交";
			end = true;
			//return;
		}
		var type = ctx.answerType == 1 ? "checkbox" : "radio";
		var choice = ctx.choice;
		ans.innerHTML = "";
		
		content.innerHTML = ctx.question;  
		qsClass.innerHTML = ctx.answerType == 1 ? "多选题" : "单选题";

		for( var i = 0; i < choice.length; i ++ ) {
			var html = "<div class=\"mui-input-row mui-"+ type +" mui-left\">" +
							"<label>"+ choice[i].choiceText +":" + choice[i].choiceLetters + "</label>" + 
							"<input name=\"radio\" type=\""+ type +"\" value=\""+ choice[i].answerId +"\" />" + 
						"</div>";
						
			ans.innerHTML += html;
		};
	};
	/**
	 * 获取答卷列表
	 */
	function getQus() {
		plus.nativeUI.showWaiting("加载中...");
		app.getQuestions().then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				qus = res.data; 
				console.log( JSON.stringify( qus[typeIndex].question.length ) )
				setContent( qus[typeIndex].question[qusIndex] )
				canPartake();
			} else {
				$.toast( requestMsg.fail )
			} 
			plus.nativeUI.closeWaiting();
		},function ( err ) {
			plus.nativeUI.closeWaiting();
			$.toast( requestMsg.fail )
		})
	};
	/**
	 * 	查询可用答题次数
	 */ 
	function canPartake() {
		app.canPartake().then(function ( res ) {
			//console.log( JSON.stringify( res ) )
		},function ( err ) { 
			mui.toast( requestMsg.fail );
		}); 
	};
	/**
	 * 	提交答卷
	 */
	function questionReward() {
		plus.nativeUI.showWaiting("加载中...");
		app.questionReward().then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				
			} else {
				mui.toast( requestMsg.fail );
			}
			plus.nativeUI.showWaiting("加载中...");
		},function ( err ) {
			plus.nativeUI.closeWaiting();
		})
	};


})( mui , document );



