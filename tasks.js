var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var path = require('path');
var ts = require('gulp-typescript');
var harp = require("harp");
var zip = require('gulp-zip');

var cleanTask = function(){
  del(["bin/**/*"]);
};
gulp.task('clean', cleanTask);

var buildTsTask = function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        out: 'output.js'
      }));
  return tsResult.js.pipe(gulp.dest('bin/js'));
};
gulp.task('build-ts', buildTsTask); 

var buildLessTask = function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./bin/css'));
};
gulp.task('build-less', buildLessTask);
 
var buildViewsTask = function(){
  harp.compile("views", "../bin/_views", function(errors, output){
    console.log("views complete");
    gulp.src(["bin/_views/**/*.*"])
      .pipe(gulp.dest("bin"))
      del(["bin/_views"]);
  });
};
gulp.task('build-views', buildViewsTask);

gulp.task("default", function(){
	console.log("Nothing to see here");
});

gulp.task("build", ["clean"], function(){
  buildLessTask();
  buildTsTask();
  buildViewsTask();
});

var zipTask = function () {
    return gulp.src('bin/**/*.*')
        .pipe(zip('release.zip'))
        .pipe(gulp.dest('dist'));
};
gulp.task('zip', ["build"],zipTask);
