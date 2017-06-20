/**
*定义一个模块
*/
define(function(require,exports,module){
	function Tools(){}

	Tools.prototype = {
		getClient:function(){
			if(window.innerWidth != null){ //ie9 +
				return {
					width:window.innerWidth,
					height:window.innerHeight
				}
			}else if(document.compatMode === "css1Compat"){ 
				return {
					width:document.documentElement.clientWidth,
					height:document.documentElement.clientHeight
				}
			}

			
			return {
				width:document.body.clientWidth,
				height:document.body.clientHeight
			}
		},
		getCurrentStyle:function(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}

			return window.getComputedStyle(obj,null)[attr];
		},
		addEvent:function(el,type,fn,capture){

			var _eventCompat = function(event){
				var type = event.type;

				if(type == 'DOMMouseScroll' || type == 'mousewheel'){
					event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0)/3;
				}

				if(event.srcElement && !event.target){
					event.target = event.srcElement;
				}

				if(!event.preventDefault && event.returnValue !== undefined){
					event.preventDefault = function (){
						event.returnValue = false;
					};
				}

				return event;
			};

			if(window.addEventListener){

				return function(el,type,fn,capture){

					if(type === 'mousewheel' && document.mozFullScreen !== undefined){
						type = "DOMMouseScroll";
					}

					el.addEventListener("mousewheel",function(event){
						
						fn.call(this,_eventCompat(event));

					},capture || false);
				}
			}else if(window.attachEvent){
				return function(el,type,fn,capture){
					el.attachEvent("on" + type,function(event){
						event = event || window.event;
						fn.call(el,_eventCompat(event));
					});
				}	
				
			};

			return function(){};
		}

	};


	module.exports = Tools;
});