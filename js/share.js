var shares=null;
var sweixin=null;
var buttons=[
	{title:'微信好友', extra:{ scene:'WXSceneSession'} },
	{title:'朋友圈', extra:{ scene:'WXSceneTimeline'} }
];
/**
 * 更新分享服务
 */
function getServices(){
	plus.share.getServices(function(s){
		shares={};
		for( var i in s ){
			var t = s[i];
			shares[t.id]=t;
		}
    	sweixin=shares['weixin'];
	}, function(e){
		console.log('获取分享服务列表失败：'+ e.message);
	});
};
function shareWeb( obj ){
    var msg={
    	content : obj.content ,
    	href : obj.href ,
    	title : obj.title ,
  		thumbs:[ obj.smallImg ]
  	};
    if( sweixin ) {
    	plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:buttons}, function( e ){
  		(e.index>0) && share(sweixin, msg, buttons[e.index-1]);
    })
    } else { 
    	plus.nativeUI.alert('当前环境不支持微信分享操作!');
    }
};
// 分享
function share(srv, msg, button){
    if(!srv){
  		mui.alert("无效的分享服务！")
    	return;
    }
    
    button && (msg.extra = button.extra);
	// 发送分享
	if( srv.authenticated ){
		console.log("已授权");
		doShare(srv, msg);
	}else{
		//申请授权
		srv.authorize(function(){
			doShare(srv, msg);
		}, function(e){
			console.log("认证授权失败："+ JSON.stringify( e ) );
		});
	}  
}
// 发送分享
function doShare(srv, msg){
	plus.nativeUI.showWaiting();
	//console.log( JSON.stringify( msg ) );
	srv.send(msg, function(){
		console.log( JSON.stringify( msg ) );
	}, function(e){
		console.log( "分享到"+srv.description+ "失败: "+JSON.stringify(e) );
	});
	var t = setTimeout(function () {
		plus.nativeUI.closeWaiting();
		clearTimeout( t );
	},5000);
};