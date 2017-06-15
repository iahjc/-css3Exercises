'use strict';

var gulp = require("gulp");
var browserSync = require('browser-sync');
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var del = require('del');

/**
* 1.LESS编译 压缩 合并
* 2.JS合并 压缩 混淆
* 3.img复制
* 4.html压缩
*/

//1.LESS编译 压缩 --合并没有必要，一般预处理CSS都可以导包
gulp.task('style',function(){
	//这里是在执行style任务时自动执行
	gulp.src(['src/styles/**/*.less','!src/styles/**/_*.less'])
		.pipe(less())
		/*.pipe(cssnano())*/
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({stream:true}))
});


//2.JS合并 压缩混淆
gulp.task('script',function(){
	gulp.src('src/scripts/**/*.js')
		//.pipe(concat('alinec.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({stream:true}))
});

//3.img复制
gulp.task('image',function(){
	gulp.src('src/images/**/*.*')
		.pipe(gulp.dest("dist/images"))
		.pipe(browserSync.reload({stream:true}))

});

//4.html压缩
gulp.task('html',function(){
	gulp.src('src/**/*.html')
		/*.pipe(htmlmin({
			  collapseWhitespace: true,
			  collapseBooleanAttributes: true,
			  removeAttributeQuotes: true,
			  removeComments: true,
			  removeEmptyAttributes: true,
			  removeScriptTypeAttributes: true,
			  removeStyleLinkTypeAttributes: true,
			}))*/
		.pipe(gulp.dest("dist"))
		.pipe(browserSync.reload({stream:true}))
});

//删除src目录中的html文件
gulp.task('clean:html',function(cb){
	del(['dist/**/*.html'],cb);
});




gulp.task('net_start_server',['style','script','image','html'],function(){


	gulp.watch("src/styles/**/*.less",['style']);
	gulp.watch("src/scripts/**/*.js",['script']);
	gulp.watch("src/images/**/*.*",['image']);
	gulp.watch("src/**/*.html",['clean:html','html']);

	browserSync({
			server:{baseDir:['dist']}
		},function(err,bs){
			console.log(bs.options.getIn(["urls","local"]))
		}
	
	);


	
});