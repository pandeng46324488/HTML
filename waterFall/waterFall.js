window.onload = function(){
	imgLocation('container','box');
}

window.onresize = function(){
	imgLocation('container','box');
}

function imgLocation(parent,content){
	//将parent下的多个content全部取出
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement( cparent, content );
	
	//元素宽度
	var imgWidth = ccontent[0].offsetWidth;

	//一排能放的个数
	var colsNum = Math.floor( document.documentElement.clientWidth / imgWidth );

	//设置容器样式和宽度，使图片能够跟随窗口大小变化排列
	cparent.style.cssText = "width:" + (imgWidth  + 10)*colsNum + "px; margin: 0 auto;";

	setColumnAllHeight(ccontent, colsNum);
	// else
	// {
	// 	clearStyle( ccontent );
	// }
}

//获取parent下指定的content子元素
function getChildElement(parent,content){
	var contentArr = [];
	var allContent = parent.getElementsByTagName('*');
	for( var i=0; i<allContent.length; i++)
	{
		if( allContent[i].className == content )
		{
			contentArr.push(allContent[i]);
		}
	}
	return contentArr;
}

//获取每列中所有图片相加的高度
//input: elementArr 元素数组
//input: rowSize  一行放置的元素个数
//output: 返回计算出每列图片总高度的数组
function setColumnAllHeight(elementArr,rowSize)
{
	clearStyle(elementArr);
	var colTotal = [];
	for( var i=0; i<elementArr.length; i++ )
	{
		if( i<rowSize )
		{
			colTotal[i] = elementArr[i].offsetHeight;
		}
		else
		{
			var minHIndex = getMinHeightIndex(colTotal);
			elementArr[i].style.position = 'absolute';
			elementArr[i].style.top = colTotal[minHIndex] + 'px';
			elementArr[i].style.left = elementArr[minHIndex].offsetLeft + 'px';
			colTotal[minHIndex] += elementArr[i].offsetHeight;
		}
	}
}

function clearStyle( arr )
{
	for( var i=0; i<arr.length; i++ )
	{
		arr[i].style.cssText = '';
	}
}

//获取数组中最小值的索引
function getMinHeightIndex( arr )
{
	var index = -1;
	var minH = Number.MAX_VALUE;
	for( var i in arr )
	{
		if( arr[i] < minH )
		{
			minH = arr[i];
			var index = i;
		}
	}
	return index;
}