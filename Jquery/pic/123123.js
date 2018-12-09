

;(function($){
				jQuery.fn.extend({
					"color":function(value){
						this.css("color",value);
					}
				})
			})(jQuery);
			
			
			;(function($){
				jQuery.fn.extend({
					tableColor:function(odd_color,even_color){
						$("tr:odd()",this).css("background-color",odd_color);
						$("tr:even()",this).css("background-color",even_color);
							
					}
				})
				
				
			})(jQuery);
			
			
			
			$(function(){
				$("table").tableColor("red","green");
			})
			


