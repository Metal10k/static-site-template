var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var path = require('path');
var ts = require('gulp-typescript');
var harp = require("harp");
var zip = require('gulp-zip');

gulp.task("jeh", function(){
	console.log("Jeh jeh jeh jeh jeh jeh jeh jeh");
});

gulp.task('clean', function(){
  del(["bin/**/*"]);
});

gulp.task('build-ts', function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        out: 'output.js'
      }));
  return tsResult.js.pipe(gulp.dest('bin/js'));
}); 

gulp.task('build-less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./bin/css'));
});
 
gulp.task('build-harp', function(){
  harp.compile("harp", "../bin", function(errors, output){
    
  });
});

gulp.task("default", function(){
	console.log("Nothing to see here");
});

gulp.task("build", ["clean", "build-ts", "build-less", "build-harp"], function(){
 
});

gulp.task('zip', ["build"], function () {
    return gulp.src('bin/**/*.*')
        .pipe(zip('release.zip'))
        .pipe(gulp.dest('dist'));
});
