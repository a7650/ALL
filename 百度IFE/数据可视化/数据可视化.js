//list=[    {val1:"",val2:"",sale}    ,    {......}   ];

//可视化list函数接受一个数组（list），开始时先清除画布，然后遍历数组中的每个对象，根据数组中的数值生成曲线。
//只有一组数据，即鼠标浮在列表上时，也相同；
//list函数   1：清除画布    2：建立坐标线     3：画折线图（折线颜色随机）；
//400*300
var canvas_1=document.getElementById("canvas_1");
var chart_1_c=canvas_1.getContext("2d");
var rgb="";


//画线函数
function inte_line(){//最后一个参数：false为随机颜色 true为默认颜色，为黑色
	if(typeof arguments[0][0]=='object'){
		var x_y=arguments[0];
	}
	else{
		var x_y=arguments;
	}
	var len=x_y.length;
	if(!x_y[len-1]){
		var r=myRandom(0,255),
			g=myRandom(0,255),
			b=myRandom(0,255);
		rgb="rgb("+r+","+g+","+b+")";
		chart_1_c.strokeStyle=rgb;
		len-=1;
	}
	else{
		chart_1_c.strokeStyle="#C4C6C2";
	}
	chart_1_c.beginPath();
	for(var i=0;i<len;i++){
		if(i==0){
			chart_1_c.move_to(x_y[0][0],x_y[0][1]);
		}else{
			if(i==len-1){
				chart_1_c.line_to(x_y[i][0],x_y[i][1]).stroke();
			}else{
				chart_1_c.line_to(x_y[i][0],x_y[i][1]);
			}
		}		
	}
	return chart_1_c;
}

 function create_chart1(list){
 	color_rgb=[];
 	chart_1_c.clearRect(0,0,600,300);
	var max_arr=[],
		max_sale=0;
	for(var i=0,len_list=list.length;i<len_list;i++){
		max_arr.push(Math.max.apply(null,list[i].sale));
	}
	max_sale=Math.max.apply(null,max_arr);
	var m_y=max_y(max_sale);
	var unit_y=m_y/10;
	
	//画横轴
	chart_1_c.beginPath();
	for(var j=0;j<11;j++){	
		inte_line([0,j*30],[600,j*30]).strokeStyle="#000000";
		chart_1_c.strokeText(unit_y*j,0,300-j*30);
	}	
//画折线
	for(var k=0;k<len_list;k++){
		var x_y=[];
		var sale=list[k].sale;
		chart_1_c.strokeStyle="#000000";
		for(var m=0;m<sale.length;m++){
			var x=(m+1)*50,
				y=(sale[m]/m_y)*300;
			x_y.push([x,y]);
			chart_1_c.strokeText(m+1,x,295);
		}
		x_y.push(false);
		inte_line(x_y);		
		color_rgb.push({})
	}	
}
 
 var tr_event=function(){
	//tr绑定事件
	var trs=document.getElementsByTagName("tr");
	var len_tr=trs.length;
	console.log(len_tr);
	for(var i=1;i<len_tr;i++){
			(function(i){
				trs[i].onmouseenter=function(){
					create_chart1([list[i-1]]);
				}
			})(i);
	}
};


 
