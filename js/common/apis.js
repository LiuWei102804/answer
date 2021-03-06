(function ( $ , win ) {
	win.ORIGIN = "http://www.78mx.cn";
	
	
	win.apis = {
		reg : 		"/api/v1/reginit.api" ,					//注册
		login : 	"/api/v1/login.api" ,					//登录
		getMsgCode : "/api/v1/authCode" ,				//获取验证码
		drawHistory : "/api/v1/withdraw/history" ,		//查询提现记录
		checkDrawStatu : "/api/v1/withdraw/check" ,		//查询是否可提现
		drawApply : "/api/v1/withdraw" ,				//申请提现
 		getInfo : "/api/v1/daily" ,						//查询个人信息
 		updateInfo : "/api/v1/updateInfo.api" ,			//修改个人资料
		updatePwd : "/api/v1/updatePwd.api" ,			//修改登录密码
		isInvitation : "/api/v1/InvitationCode/judge" , //是否有上级
		getMyTeam : "/api/v1/myTeam" ,					//我的团队
		reward : "/api/v1/question/callback" ,			//答题奖励
		getQuestion : "/api/v1/survey/list" ,			//查询问卷列表
		questionNum : "/api/v1/survey/checkNum" ,		//查询可答题次数
		questionReward : "/api/v1/question/callback" ,	//提交答卷
		getNews : "/api/v1/notice/list" ,				//获取咨询信息
		putTask : "/api/v1/company/add" ,				//任务投放,企业合作
		getPayUrl : "/api/v1/toPay" 	,				//获取充值 URL
		getUpLevelUrl : "/api/v1/toPay888" 	,				//升级合伙人 URL
		getDailyHistory : "/api/v1/dailyHistory" , 		//今日收入&总收入
		getSurveyHistory : "/api/v1/survey/surveyHistory" ,	//获取已答答卷
		drawLogById : "/api/v1/dowithdraw" 				//查询单条提现记录
	};
	win.requestMsg = {
		fail : "请求数据失败，请重试"
	}
})(mui , window );
