(function($, owner) {
	/**
	 * 用户注册
	 **/
	 owner.reg = function ( params ) {
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
   owner.updateInfo = function ( params ) {
   		return Post( ORIGIN + apis.updateInfo , params );
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
	owner.putTask = function ( params ) {
		return Post( ORIGIN + apis.putTask , params );
	};
	/**
	 * 	申请提现
	 * 
	 */
	owner.drawApply = function ( params ) {
			return Post( ORIGIN + apis.drawApply , params );
	}
	/*
	 	查询问卷
	 * */
	owner.getQuestions = function () {
		return Get( ORIGIN + apis.getQuestion );
	}
	/**
	 * 	查询可答题次数
	 */
	owner.canPartake = function () {
		return Get( ORIGIN + apis.questionNum );
	}
	/**
	 * 	提交答卷
	 */
	owner.questionReward = function () {
		return Get( ORIGIN + apis.questionReward );
	}
}(mui, window.app = {}));