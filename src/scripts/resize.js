define(function(require,exports,module){
	

	var tools = require("tools");
	var _tools = new tools();
	console.log(_tools);

	function Resize(){
		this.height = _tools.getClient().height;
		this.obj = null;
		this.content = document.querySelector(".content");
		this.current = 0;
		this.size = document.querySelectorAll(".item").length;
	}

	Resize.prototype = {
		init:function(){
			this.setHeight();
			this.bindDom();
		},
		bindDom:function(){
			
			window.onresize = function(self){
				return function(){
					self.setHeight();
				};
			}(this);

		
			var self = this;
			_tools.addEvent()(document,"mousewheel",function(event){
				if (event.delta > 0) {

                   //往下滚
                 	self.current++;
                 	if(self.current > (self.size-2)){
                 		self.current = self.size-2;
                 		return;
                 	}
                 	console.log(self.size);
                 	self.animation(self.height*self.current);

                 } else if (event.delta < 0){

                 	self.current--;
                    if (self.current < 0){ self.current = 0; return;} 
                    self.animation(self.height*self.current);

                 	
                 }
			});

		},
		setHeight:function(){

			this.height = _tools.getClient().height;

			var items = document.querySelectorAll(".item");
			items = Array.prototype.slice.call(items);
			for(var item in items){
				items[item].style.height = this.height +"px";
			}
			
		},
		animation:function(target){
			
			var self = this;
			self.clearAnimation();
			self.obj = setInterval(function(){
				var _top = Math.abs(parseInt(_tools.getCurrentStyle(self.content,"top").replace("px","")));
				
				var step = (target - _top)/10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				//console.log(_top +"   "+ step);
				self.content.style.top  = -(_top + step) + "px";

				if(_top + step == target) self.clearAnimation(self.fn);

			},30);
		},
		clearAnimation:function(fn){
			window.clearInterval(this.obj);
			if(fn) fn();
		},
		fn:function(){
			console.log(this.current)
		}
	};

	module.exports = Resize;
});