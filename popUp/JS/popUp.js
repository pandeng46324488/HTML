/*-------------------------------
*	Author: D.pan
*   Date: 2015/6/15
*	Version: 1.2
*   Description: 弹窗插件
*	History: 1.1 - 添加了在显示或关闭时的动画效果,但存在一个BUG，就是关闭时无法移除DIV.
*			 1.2 - 修改动画BUG
-------------------------------*/
;(function($){

	var defaultSetting = {
		title : '', //标题
		closeText : '关闭', //关闭按钮
		content : '', //内容
		boxId : 'popDiv', //弹窗id
		closeId : 'closeBtn', //关闭按钮id
		boxClassName : 'popDiv', //外层容器样式
		titleClassName : 'titleDiv', //标题行样式
		closeBtnClassName : 'closeBtn', //关闭按钮样式
		contentClassName : 'content', //内容样式
		width : 450,
		height : 200
	}

	$.extend({
			'popUp':function(obj){
				new popUpAni(obj?jQuery.extend(defaultSetting,obj):defaultSetting);
				return this;
			}
	});


	/*动画版本*/
	function popUpAni(obj){

		var $popUp = createDiv( '', obj.boxClassName, obj.boxId );

		if( $( '#'+obj.boxId ).length <= 0 ){
			
			$('body').append($popUp);			
			var $title = createDiv( obj.title, obj.titleClassName, '' );			
			$title.append( createDiv( obj.closeText, obj.closeBtnClassName, obj.closeId ) );

			//动画显示
			$('#'+obj.boxId).animate({ width:obj.width,height:obj.height},200 ).append( $title ).append( createDiv( obj.content, obj.contentClassName ) );
			
			//为关闭按钮添加事件
			$('#' + obj.closeId ).click(function(){
				$('#'+obj.boxId).empty().animate({height:0,width:0},200).hide(2, function(){
					$('#'+obj.boxId).remove();
				});
			});
		}
	}

	/*正常版本*/
	function popUp(obj)
	{		
		var $popUp = createDiv( '',  obj.boxClassName, obj.boxId );
		var $title = createDiv( obj.title, obj.titleClassName, '' );
		
		$title.append( createDiv( obj.closeText, obj.closeBtnClassName, obj.closeId ) );
		$popUp.append( $title );
		$popUp.append( createDiv( obj.content, obj.contentClassName ) );    

		if( $( '#'+obj.boxId ).length <= 0 ){

			$('body').append($popUp);
			$('#'+obj.boxId).animate( { width:obj.width,height:obj.height } );
			$('#' + obj.closeId ).click(function(){
				$('#'+obj.boxId).remove();
			});
		}
	}

	function createDiv( con, cName, id ){
		return $('<div class="'+(cName?cName:'')+'" id='+(id?id:'')+'>'+con+'</div>');
	}

})(jQuery);
