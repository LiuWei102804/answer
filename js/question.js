(function ( $ , doc ) {

	var ansData = {   			//答题提交数据
		title : "" ,
		surveyId : "" ,
		question : []
	},			
		qus = [],			//答卷列表
		qusIndex = 0,		//问卷索引
		typeIndex = 0,		//问卷类型索引
		toDayMaxPartake = 2,//剩余答题次数
		end = false,			//答题结束
		isChoice = false;		// 是否有选中
	var content = null,		//问卷标题
		ans = null,			//选项列表
		nextBtn = null,		//提交按钮	
		input = null,
		qsClass = null;		//选项类型
		
	var setContent;
	var currentWebview;
	var currDay;
	var userInfo;
	var qsInfo;
		
	/**
	 * 	重写 mui.back
	 */
	var old_back = mui.back;
	mui.back = function () {
		mui.confirm("确认退出问卷调研?","提示","确认",function ( btn ) {
			if( btn.index == 0 ) {
				old_back();
			};
		});
	};	
	$.init({
	}); 
	$.plusReady(function () {
		userInfo = JSON.parse( plus.storage.getItem("userInfo") );
		var user = userInfo.memberinfo.nickName || userInfo.memberinfo.phone;
		var D = new Date();
		currDay = D.getFullYear() + "/" + ( D.getMonth() + 1 ) + "/" + D.getDate();
		
		currentWebview = plus.webview.currentWebview(); 
		typeIndex = currentWebview.index; 
//plus.storage.setItem("qsInfo8" ,JSON.stringify({ qusIndex : 4 , t : 1544371200000 , isOver : 1 }));
		qsInfo = plus.storage.getItem("qsInfo" + typeIndex ) != null ? JSON.parse( plus.storage.getItem("qsInfo" + typeIndex ) ) : null; 
		if( qsInfo != null ) { 
			qusIndex = qsInfo.qusIndex;
			if( qsInfo.isOver == 1 && qsInfo.t == Date.parse( currDay ) && qsInfo.account == userInfo.memberinfo.phone ) {
				$.alert("今日已答过该答卷！","提示",function () {
					old_back();
				});
			}
		} else {
			plus.storage.removeItem("qsInfo" + typeIndex );
		}
		
		//plus.storage.clear();
		
		content = $(".content")[0];
		qsClass = $(".qs-class")[0];
		ans = $(".ans")[0];
		nextBtn = $(".qs-next")[0];
		
		$(".username")[0].innerHTML = "您好：" + user;  

	
		$("body").on("tap",".mask",function () {
			this.classList.add("mui-hidden");
			old_back();
		})
		
		/*
		 	下一题
		 * */
		$(".mui-content-padded").on("tap",".qs-next",function () {
			if( toDayMaxPartake <= 0 ) {
				$.alert("今日答题活动已达上限");
				return;
			};
			if( !isChoice ) {
				$.alert("请至少选择一项");
				return;
			};
			/**
			 * 	答卷数据
			 */
			var obj = {
				answerType : qus[0].question[qusIndex].answerType ,
				questionId : qus[0].question[qusIndex].questionId ,
				question : qus[0].question[qusIndex].question ,
				choice : []
			}
			input = $("input[type]");
			$.each( input , function ( index, item ) {
				if( item.checked ) { 
					var obj2 = qus[0].question[qusIndex].choice[index];
					obj.choice.push( obj2 );
				}
			});
			ansData.question.push( obj );
			/**
			 * 	今日可答题次数减1
			 */
			//toDayMaxPartake -= 1;
			/**
			 * 答卷结束
			 */
			if( end ) {
				questionReward();
				return;
			};
			qusIndex += 1;
			setContent( qus[0].question[qusIndex] );
			isChoice = false;
			
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
		 
		
		setContent = function ( ctx ) {
			
			plus.storage.setItem("qsInfo" + typeIndex ,JSON.stringify({ qusIndex : qusIndex , t : Date.parse( currDay ) , isOver : qsInfo && qsInfo.isOver ? qsInfo.isOver : "0" , account : userInfo.memberinfo.phone }));
			
			if( typeof qus[0].question[qusIndex + 1] == "undefined" ) {
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
		}
	});
	

	/**
	 * 获取答卷列表
	 */
	function getQus() {
		plus.nativeUI.showWaiting("加载中...");
		console.log( ( +typeIndex + 1 ) )
		app.getQuestions({ current : ( +typeIndex + 1 ) , size : 1 }).then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				qus = res.data; 
				//console.log( JSON.stringify( qus ) )
				if( qus[0].question[qusIndex] ) {
					setContent( qus[0].question[qusIndex] );
				}
				/**
				 * 	答卷标题 
				 */
				ansData.title = qus[0].title;
				ansData.surveyId = qus[0].surveyId;
				/**
				 * 	查询剩余答题次数
				 */
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
			if( res.hasOwnProperty("success") && res.success ) {
				toDayMaxPartake = res.data;
				$(".over")[0].innerHTML = "剩余答题次数：" + toDayMaxPartake;
				
			}
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
		app.questionReward({ suveryId : ansData.surveyId } , { content : ansData } ).then(function ( res ) {
			if( res.hasOwnProperty("success") && res.success ) {
				plus.storage.setItem("qsInfo" + typeIndex ,JSON.stringify({ qusIndex : qusIndex , t : Date.parse( currDay ) , isOver :"1" }));
				$(".reward")[0].innerHTML = res.data;
				$(".rewardType")[0].innerHTML = "已放入"+ ( userInfo.memberinfo.disUserType >= 1 ? '精英':'普通')+"账户";
				$(".mask")[0].classList.remove("mui-hidden");
				
				
				//plus.storage.setItem("question" + typeIndex , 1);
			} else {
				mui.toast( res.errorMessage );
			}
			plus.nativeUI.closeWaiting();
		},function ( err ) {
			plus.nativeUI.closeWaiting();
		})
	};
	

})( mui , document );



