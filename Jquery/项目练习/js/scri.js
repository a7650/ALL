
$(function(){
(function(){
	// 图片轮播图
	var img_inde=0,
		img_max=$("#JS_imgWrap img").length,
		imgwrap=$("#JS_imgWrap img"),
		img_a=$("#jnImgroll div a");
	function imgRoll(){
		img_inde++;
		if(img_inde==img_max){
			imgwrap.eq(0).fadeIn(200).siblings().fadeOut(200);
			img_a.eq(0).addClass("chos").siblings().removeClass("chos");
			img_inde=0;
			
		}
		else{
			imgwrap.eq(img_inde).fadeIn(200).siblings().fadeOut(200);
			img_a.eq(img_inde).addClass("chos").siblings().removeClass("chos");
		}
		var href_a=img_a.eq(img_inde).attr("href");
		imgwrap.parent().attr("href",href_a);
		imgwrap.loop=setTimeout(imgRoll,3000);
	}
	img_a.mouseenter(function(){	
		clearTimeout(imgwrap.loop);	
		img_inde=$(this).index()-1;
		imgRoll();
		clearTimeout(imgwrap.loop);	
	});
	img_a.mouseleave(function(){
		imgwrap.loop=setTimeout(imgRoll,3000);
	})
	imgwrap.mouseenter(function(){
		if(imgwrap.loop)clearTimeout(imgwrap.loop);
	})
	imgwrap.mouseleave(function(){
		imgwrap.loop=setTimeout(imgRoll,3000);
	})
	imgRoll();
})();

// 推荐列表滚动
	$("#jnBrandTab li").click(function(){
		var li_inde=$(this).index();
		var list=$("#jnBrandList");
		if(!list.is(":animated")){
			list.animate({"left":-800*li_inde}, 500);
			$(this).addClass('chos').siblings().removeClass('chos');
		}
	}).eq(0).click();
	var hr=$("#jnBrandList li :eq(1)").attr("href");
	$("#jnBrandList li :eq(0)").attr("href",hr);

	$("#jnBrandList li").mouseenter(function(){
		$(" :eq(0)",this).fadeIn(200);
	});
	$("#jnBrandList li").mouseleave(function(){
		$(" :eq(0)",this).hide();
	});

// skin_缓存
(function(){
	//switch Skin
	var switchSkin=function(val){
		$("#skin_css").attr("href","../skin_style/"+val+".css");
		$("#"+val).addClass("selected").siblings().removeClass("selected");
		$.cookie("skin",val,{path:'/',expires:10});
	};
	var cookie_skin=$.cookie("skin");
	if(cookie_skin){
		switchSkin(cookie_skin);
	}
	$("#skin li").click(function(event){		
		switchSkin(this.id);
	});
	
})();

//search操作
(function(){
	$("#inputSearch").focus(function(event){
		if($(this).val()==this.defaultValue){
			$(this).val("");
		}
	}).blur(function(event){
		if($(this).val()==""){
			$(this).val(this.defaultValue);
		}
	}).keyup(function(event){
		if($(this).val()==""){
			alert("表单已提交");
		}
	})

})();




//






})
