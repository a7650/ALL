//table_content
 window.creat_table1=function(a1,b1,a2,b2){
	var len_a=a1.length,
		len_b=b1.length;
	var table_text="",
		data=[];
	list=[];
	for(var i=0;i<len_a;i++){
		for(var j=0;j<len_b;j++){
			for(var k=0,len_sdata=sourceData.length;k<len_sdata;k++){
				if(sourceData[k][a2]==a1[i]&&sourceData[k][b2]==b1[j]){
					data=sourceData[k].sale;
					var list2={
						val1:a1[i],
						val2:b1[j],
						sale:data
					}
					list.push(list2);
					break;
				}
			}
			if(j==0){
				table_text+="<tr><td class=first_list rowspan="+len_b+">"+a1[i]+"</td><td>"+b1[0]+"</td>";
				for(var m=0,len_data=data.length;m<len_data;m++){
					table_text+="<td>"+data[m]+"</td>";
				}
				table_text+="</tr>";
			}
			else{
				table_text+="<tr><td>"+b1[j]+"</td>";
				for(var m=0,len_data=data.length;m<len_data;m++){
					table_text+="<td>"+data[m]+"</td>";
				}
				table_text+="</tr>";
			}
		}
	}
	return table_text;
}

//数组去重
 window.re_arr=function(arr){
	var arr2=[];
	for(var i=0;i<arr.length;i++){
		if(arr2.indexOf(arr[i])==-1){
			arr2.push(arr[i]);
		}		
	}
	return arr2;
}
 
Object.prototype.move_to=function(x,y){
	this.moveTo(x,300-y);
	return this;
};
Object.prototype.line_to=function(x,y){
	this.lineTo(x,300-y);
	return this;
}
//计算某一数值最接近的10的倍数或者100的倍数；
window.max_y=function(y){
	if(y>0&&y<100){
		return Math.ceil(y/10)*10;
	}
	if(y>99&&y<1000){
		return Math.ceil(y/100)*100;
	}
}
//生成随机数
window.myRandom=function(min, max) {
        var choices = max - min + 1;
        return Math.floor(Math.random() * choices + min)
}