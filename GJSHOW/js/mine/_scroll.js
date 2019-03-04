$(function(){
	var h_total=$(window).height();
	$(".slide-bar").css("height",(h_total-88));
	$(".slide-bar .slide-bar_body").css("height",(h_total-88-60));
	var curClick;
	$(".tools-bar a.tool-bar_item").bind("click",function(event){
		$(".slide-bar").addClass("open");
		var $this=$(this);
		curClick=$this.attr("data");
		$(".slide-bar"+curClick).show();
        $(".slide-bar"+curClick).siblings().hide();
	});
	$(".slide-bar a.close_slider").bind("click",function(){
		$(this).parent().parent().hide();
		$(".slide-bar").removeClass("open");
	})

})









