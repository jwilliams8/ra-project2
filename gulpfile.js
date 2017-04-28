var gulp = require('gulp');

var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');

gulp.task('default', function() {
        console.log('bananas');
      return gulp.src("main.scss")
   	    .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.min.css'))
        .pipe(cleanCSS({debug: true}))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('watch', function(){
    gulp.watch('*.scss', ['default']);
});
