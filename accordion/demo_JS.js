
//兼容事件处理器
var eventUtil = {
	addHandler: function( element, type, handler ){
		if(element.addEventListener){
			element.addEventListener( type, handler, false );
		}
		else if(element.attachEvent){
			element.attachEvent( 'on' + type, handler);
		}
		else{
			element['on' + type] = handler;
		}
	},
	removeHandler: function( element, type, handler ){
		if( element.removeEventListener){
			element.removeEventListener( type, handler, false );
		}
		else if( element.detachEvent){
			element.detachEvent( 'on' + type, handler );
		}
		else
		{
			element['on'+type] = null;
		}
	}
}

//初始化
var init = function(){

	//获取所有的li对象
	var allEle = getAllLiEle('box', ['hiddenLi','showLi']);

	for( var i=0; i<allEle.length; i++ ){
		eventUtil.addHandler( allEle[i], 'click', dealClick );
	}
}

//元素单击事件
function dealClick(event)
{
	setAllClassName('hiddenLi');

	//var $li = $(event.currentTarget);

	//$li.animate({width:'500px',opacity:'1.0'});
	
	event.currentTarget.className = 'showLi';	
}

//重置所有元素的className
function setAllClassName( setName )
{
	var ulEle = document.getElementById('box').children[0];
	//alert( temp.childElementCount );

	for( var i=0; i<ulEle.childElementCount; i++ )
	{
		ulEle.children[i].className = "hiddenLi";
	}
}

//获取parent下所有的指定cssName对象的子元素
function getAllLiEle( parent, tagNames ){

	var p = document.getElementById(parent);

	var allEle = [];
	var tempEle = p.getElementsByTagName('*');
	for( var i=0; i<tempEle.length; i++ ){

		for( var j=0; j<tagNames.length; j++ ){
			if( tempEle[i].className == tagNames[j] )
			{
				allEle.push( tempEle[i] );
				break;
			}
		}
	}
	//alert(allEle.length);
	return allEle;
}

//注册事件
eventUtil.addHandler( window, 'load', init );