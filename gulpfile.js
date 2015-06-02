var gulp = require('gulp')
var less = require('gulp-less');
var path = require('path');
var ts = require('gulp-typescript');
var harp = require("harp");
 
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
  harp.compile("harp", "../bin/html", function(errors, output){
    
  });
//  return gulp.src("./harp/**/*.*")
//    .pipe(function(files){
//        harp.compile("/harp/")
//    });
//  ;
});


gulp.task("default", function(){
	console.log("Nothing to see here");
});

gulp.task("build", ["build-ts", "build-less", "build-harp"], function(){
 
});