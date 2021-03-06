(function($, owner) {
	/**
	 * 用户注册
	 **/
	 owner.reg = function ( params , data ) {
	 	var _data = data ? data : {};
		return Post( ORIGIN + apis.reg , params );
	 };
	 /*
		用户登录
	 */
	owner.login = function ( params ) {
		return Post( ORIGIN + apis.login , params );
	};
	/**
	 * 	更新密码
	 */
	owner.updatePwd = function ( params ) {
		return Post( ORIGIN + apis.updatePwd , params );
	};
	 /*
		发送验证码
	 */
	owner.sendCode = function ( params ) {
		return Get( ORIGIN + apis.getMsgCode , params );
	};
	/*
		查询个人信息
	*/
   owner.getUserInfo = function () {
	   return Get( ORIGIN + apis.getInfo );
   };
   /**
    * 	修改个人信息
    */
   owner.updateInfo = function ( params , data ) {
   		var _data = data ? data : {};
   		return Post( ORIGIN + apis.updateInfo , params , _data );
   }
	 /*
		查询提现记录
	 */
	owner.getDrawLog = function ( params ) {
		return Get( ORIGIN + apis.drawHistory , params );
	};
	/**
	 * 	查询是否可以提现
	 * 
	 */
	owner.checkDrawStatu = function ( params ) {
		return Get( ORIGIN + apis.checkDrawStatu , params );
	};
	/*
			查询新闻咨询
	*/
	owner.getNews = function () {
		return Get( ORIGIN + apis.getNews );
	};
	/*
			获取我的团队信息
	*/
	owner.getMyTeam = function ( params ) {
		return Get( ORIGIN + apis.getMyTeam , params );
	};
	/*
			任务投放
	*/
	owner.putTask = function ( params , data ) {
		var _data = data ? data : {};
		return Post( ORIGIN + apis.putTask , params , _data  );
	};
	/**
	 * 	申请提现
	 * 
	 */
	owner.drawApply = function ( params , data ) {
		var _data = data ? data : {};
		return Post( ORIGIN + apis.drawApply , params , _data );
	};
	/**
	 * 	查询单条提现记录
	 * 
	 */
	owner.getDrawLogById = function ( params ) {
		return Get( ORIGIN + apis.drawLogById , params );
	};
	/*
	 	查询问卷
	 * */ 
	owner.getQuestions = function ( params ) {
		return Get( ORIGIN + apis.getQuestion , params ); 
	};
	/**
	 * 	查询可答题次数
	 */ 
	owner.canPartake = function () {
		return Get( ORIGIN + apis.questionNum );
	};
	/**
	 * 	提交答卷
	 */
	owner.questionReward = function ( params , data ) {
		var _data = data ? data : {};
		return Post( ORIGIN + apis.questionReward , params , _data );
	};
	/**
	 * 	获取充值 URL
	 */
	owner.getPayUrl = function () {
		return Get( ORIGIN + apis.getPayUrl );	
	};
	/**
	 * 	升级合伙人 URL
	 */
	owner.getUpLevelUrl = function () { 
		return Get( ORIGIN + apis.getUpLevelUrl );	
	};
	/**
	 *	获取今日收入 
	 */
	owner.getDailyHistory = function ( params , data ) {
		var _data = data ? data : {};
		return Post( ORIGIN + apis.getDailyHistory , params , _data );
	};
	/**
	 *	获取已答答卷 
	 */
	owner.getSurveyHistory = function () {
		return Get( ORIGIN + apis.getSurveyHistory );
	};
}(mui, window.app = {}));

