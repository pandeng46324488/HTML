
$(document).ready(function(){
	
	var cur = 0;
	var len = 5;

	$('div.box ul li').click(function(){
		$(this).siblings().animate({width:'35px'});
		$(this).animate({width:'500px'});
		cur = $(this).index();
	});

	function run()
	{
		var $ele = $('div.box ul li').eq(cur);
		$ele.siblings().animate({width:'35px'}, 1000);
		$ele.animate({width:'500px'},1000);
		cur = (cur+1)%5;
		setTimeout( run, 2500 );
	}
	
	run();
});