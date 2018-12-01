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
	 /*
		发送验证码
	 */
	owner.sendCode = function ( params ) {
		return Get( ORIGIN + apis.getMsgCode , params );
	};
	/*
		查询个人信息
	*/
   owner.getUserInfo = function ( params ) {
	   return Get( ORIGIN + apis.getInfo , params );
   };
   /*
		查询提现记录
   */
   owner.getUserInfo = function ( params ) {
	   return Get( ORIGIN + apis.drawHistory , params );
   };
	 /*
			查询提现记录
	 */
	owner.getDrawLog = function ( params ) {
			return Get( ORIGIN + apis.drawHistory , params );
	}
	/*
			查询新闻咨询
	*/
	owner.getNews = function ( params ) {
			return Get( ORIGIN + apis.getNews , params );
	};
}(mui, window.app = {}));