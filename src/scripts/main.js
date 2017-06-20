//导包
seajs.config({
	alias:{
		'tools':'tools.js',
		'resize':'resize.js',
		'screen':'screen.js',
		'360':'360.js'
	}
});
window.onload = function(){
	seajs.use('360');
}