 //创建checkbox
window.create_option=function(date,class_name){
	if(date&&Object.prototype.toString.call(date) === '[object Array]'){
		var div_text="";
		for(var i=0,len=date.length;i<len;i++){
			div_text+="<label><input type=checkbox checked=true value="+date[i]+" class="+class_name+" />"+date[i]+"</label>";
		}
		div_text="<div id="+class_name+">"+div_text+"<label><input type=checkbox checked=true  value=全选  class="+class_name+" />全选</label></div>";
		return div_text;
	}
};
 //被选择的选项,返回选中的数组
 window.checked_num=function(class_name){
	var checked_ele=[];
	var ele=document.getElementsByClassName(class_name);
	for(var i=0,len=ele.length;i<len;i++){
		if(ele[i].checked&&ele[i].value!=="全选"){
			checked_ele.push(ele[i].value);
		}
	}
	return checked_ele; 
};
 //table_head
 window.create_table2=function(){
	 var product_checked=checked_num("product"),
	     region_checked=checked_num("region");
	 var len_p=product_checked.length,
	 	 len_r=region_checked.length;
	 var tabl=document.getElementById("tabl");
	 if(len_r<len_p){
	 	var table_head="<tr><td class=first_list>地区</td><td>产品</td><td>1月</td><td>2月</td><td>3月</td><td>4月</td><td>5月</td><td>6月</td><td>7月</td><td>8月</td><td>9月</td><td>10月</td><td>11月</td><td>12月</td></tr>"
	 	tabl.innerHTML=table_head+creat_table1(region_checked,product_checked,"region","product");
	 }
	 else{
	 	var table_head="<tr><td class=first_list>产品</td><td>地区</td><td>1月</td><td>2月</td><td>3月</td><td>4月</td><td>5月</td><td>6月</td><td>7月</td><td>8月</td><td>9月</td><td>10月</td><td>11月</td><td>12月</td></tr>"
	 	tabl.innerHTML=table_head+creat_table1(product_checked,region_checked,"product","region");
	 }	 
	 create_chart1(list);
	  tr_event();
};
 //生成选项
 (function(){
 	var all_product=[],
	    all_region=[];
	for(var i=0,len=sourceData.length;i<len;i++){
		all_product.push(sourceData[i].product);
		all_region.push(sourceData[i].region);
	}
	var checkbox_p=re_arr(all_product),
		checkbox_r=re_arr(all_region);
	var check_box=document.createElement("div");
		check_box.id="check_box";
		check_box.innerHTML=create_option(checkbox_p,"product")+create_option(checkbox_r,"region");
	document.body.appendChild(check_box);
 })()
 //绑定选项点击事件
window.inpu_even=function(class_name){
	var inpu=document.getElementsByClassName(class_name);
	var len=inpu.length-1;
	for(var i=0;i<len;i++){
		inpu[i].onclick=function(){
			if(checked_num(this.className).length==0){
				this.checked=true;
			}
			else{
				if(checked_num(this.className).length==len){
					inpu[len].checked=true;
				}
				else{
					inpu[len].checked=false;
				}
				create_table2();
			}
		}
	}
	var all_choose=inpu[len];
	all_choose.onclick=function(){
		if(this.checked){
			for(var i=0;i<len;i++){
				inpu[i].checked=true;
			}
		}
		else{
			for(var i=0;i<len;i++){
				inpu[i].checked=false;
			}
		}
		create_table2();
	}
	
};
 create_table2();
 inpu_even("product");
 inpu_even("region");



































