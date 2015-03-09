/**
 * 
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('jshint', function(){
	gulp.src('./src/js/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'));
});

gulp.task('imagemin', function(){
	gulp.src('./src/img/**/*')
	    .pipe(changed('./build/img'))
	    .pipe(imagemin())
	    .pipe(gulp.dest('./build/img'));
});

gulp.task('video', function(){
	gulp.src('./src/video/*')
	    .pipe(gulp.dest('./build/video'));
});

gulp.task('font', function(){
	gulp.src('./src/font/*')
	    .pipe(gulp.dest('./build/font'));
});

gulp.task('htmlpage', function(){
	gulp.src('./src/*.html')
	    .pipe(changed('./build/'))
	    .pipe(minifyHTML())
	    .pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function(){
	gulp.src('./src/js/*.js')
	    .pipe(concat('script.js'))
	    .pipe(stripDebug())
	    .pipe(uglify())
	    .pipe(gulp.dest('./build/js'))
});

gulp.task('styles', function(){
	gulp.src('./src/css/*.css')
	    .pipe(concat('styles.css'))
	    .pipe(autoprefix('last 2 versions'))
	    .pipe(minifyCSS())
	    .pipe(gulp.dest('./build/css'));
});

gulp.task('browser-sync', function(){
	browserSync({
		proxy:'http://datos.local/pld_zemoga/build/'
	})
});

gulp.task('default', ['imagemin', 'video', 'font', 'htmlpage', 'scripts', 'styles', 'jshint', 'browser-sync'], function(){
	gulp.watch('./src/*.html', function(){
		gulp.run('htmlpage', reload);		
	});
	
	gulp.watch('./src/js/*.js', function(){
		gulp.run('jshint', 'scripts', reload);
	});
	
	gulp.watch('./src/css/*.css', function(){
		gulp.run('styles', reload);
	});
	
	gulp.watch('./src/img/*', function(){
		gulp.run('imagemin', reload);
	});
});