(function ( $ , win ) {
	win.ORIGIN = "http://47.104.139.205:8000";
	
	
	win.apis = {
		reg : "/api/v1/reginit.api" ,					//注册
		getInfo : "/api/v1/memberinfo" ,				//查询个人信息
		updatePwd : "/api/v1/updatePwd.api" ,			//修改登录密码
		isInvitation : "/api/v1/InvitationCode/judge" , //是否有上级
		getMyTeam : "/api/v1/myteam" ,					//我的团队
		reward : "/api/v1/question/callback" ,			//答题奖励
		getQuestion : "/api/v1/survey/list" ,			//查询问卷列表
	}
})(mui , window );
