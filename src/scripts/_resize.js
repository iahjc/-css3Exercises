define(function(require,exports,module){
	

	var tools = require("tools");
	var _tools = new tools();
	console.log(_tools);

	function Resize(){
		this.height = _tools.getClient().height;
		this.obj = null;
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

		

			_tools.addEvent()(document,"mousewheel",function(event){
				if (event.delta > 0) {
                    // 往上滚
                    
                 } else if (event.delta < 0){
                 	//往下滚
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
			this.setInterval(function(){

			},30);
		},
		clearAnimation:function(){
			window.clearInterval(this.obj);
		}
	};

	module.exports = Resize;
});