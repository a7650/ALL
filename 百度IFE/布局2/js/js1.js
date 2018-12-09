$(function(){
	// message_list detail_list
	var user_id="ZZP_FIR";
	var you_id=$(".current_linker>.linker_name").val();
	var date={
		Face:{
			name:"Jordan Jackson"
		},
		Face1:{
			name:"Bessie Berry"
		}
	};
	var EventUtil={
			getEvent:function(event){
				return event?event:window.event;
			},
			getWheelDate:function(event){
				return event.wheelDelta?event.wheelDelta:-event.detail*40;
			}
		};
		
	
	$("#input_message").focus(function(){
		$(this).parent().css("box-shadow","0 0 50px rgba(0,0,0,.3)");
	}).blur(function(){
		$(this).parent().css("box-shadow","");
	});
	
	//position
	(function(){
		var posi_top=-(parseInt($("#detail_list").css("height"))-parseInt($("body").css("height"))+290);
		if(posi_top<0){
			$("#detail_list").css("top",posi_top);
		}
		
	})();
	
	//list_scroll
	(function(){		
		var tar="",
			_tall;
		
		$("#message_list").mouseenter(function(){
			tar="#message_list";
			_tall=parseInt($(this).css("height"));
		});
		$("#message_list").mouseleave(function(){
			tar="";
			tall="";
		});
		$("#detail_list").mouseenter(function(){
			tar="#detail_list";
			_tall=parseInt($(this).css("height"));
		});
		$("#detail_list").mouseleave(function(){
			tar="";
			_tall="";
		});
		
		var scroll=function(event){
			if(tar){
				var n=tar=="#detail_list"?280:150;
				event=EventUtil.getEvent(event);
				var delta=EventUtil.getWheelDate(event);
				var _top=parseInt($(tar).css("top")),
					body_height=parseInt($("body").css("height")),
					_x=_tall+n-body_height;		
				if((_tall<body_height-n)&&(delta>0)&&(_top>=0)){
					$(tar).prev().css("box-shadow","");
					return;
				}
				if((-_top)<_x){
					if(delta>0){
						if(_top>=0){
							$(tar).prev().css("box-shadow","");
							return;
						}
						$(tar).css("top",_top+20);
					}
					else{
						$(tar).css("top",_top-20).prev().css("box-shadow","0 0 30px rgba(0,0,0,.5)");
					}
				}
				else if(delta>0){
					$(tar).css("top",_top+20);
				}
				
			}
		};
		var mousewheel=function(){
			if(document.addEventListener){ 
				document.addEventListener('DOMMouseScroll',function(event){scroll(event);},false); 
				document.addEventListener('mousewheel',function(event){scroll(event);},false); 
			}else{
				document.onmousewheel=function(event){
					scroll(event);
				}
			}			
		}();		
	})();
	
	
	
	//message_send
		(function(){
			var send=function(user,time,mes,s){			
				var clas=s&&s==true?"my":"you";
				var h_text="<div class="+clas+"><img src=imgs/"+user+".png class="+clas+"_face><div class='detail_message'><div><span class="+clas+"_name>"+date[user].name+"</span><span class='time_2'>"+time+"</span><span class=send_status>正在发送</span></div><p class=message_content><pre>"+mes+"</pre></p></div></div>";
				$(".detail:last-child").append(h_text);			
			
			};
			$("#send").click(function(){
				if($("#input_message").val()==""){
					alert("不能发送空信息");
					return;
				}
				var now=new Date(),
					h=now.getHours(),
					m=now.getMinutes();
				if(h>=12){
					h=h==12?12:h-12;
					var time2=h+":"+m+" PM";
				}
				else{
					var time2=h+":"+m+" AM";
				}				
				var user="Face",
					mes=$("#input_message").val();
				send(user,time2,mes,true);
				//ajax请求后台数据
				$.post("send.php",{
					message:mes,
					time:time2,
					sender:user_id,
					receiveder:you_id
				},function(echo){
					if(echo.code=="0"){
						$(".send_status").val("echo.error_message");
					}
					else{
						$(".send_status").val("发送成功").css("color","#2399f1").hide(300);
					}
				});
				$("#input_message").val("");
				var now_top=$("#detail_list").height();
				var posi_top=-(now_top-$("body").height()+290);
				if(posi_top<0){
					$("#detail_list").animate({"top":posi_top},200);
				}
				$("#input_message").focus();
			});
			$("#input_message").keydown(function(e){
				var event=EventUtil.getEvent(e);
				if(event.keyCode==13){
					$("#send").click();
				}
			});
			
		})();
	








	
})
