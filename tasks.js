var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var path = require('path');
var ts = require('gulp-typescript');
var harp = require("harp");
var zip = require('gulp-zip');
var gulpsync = require('gulp-sync')(gulp);

var cleanTask = function(cb){
  del(["bin/**/*"],
  function(){
    cb();
  });
};
gulp.task('clean', cleanTask);

var buildTsTask = function (cb) {
  console.log("compiling typescript...");
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        out: 'output.js'
      }));
  var outResult = tsResult.js.pipe(gulp.dest('bin/js'));
  outResult.on('end', function(){
    console.log("Typescript compilation complete")
  });
  return outResult;
};
gulp.task('build-ts', buildTsTask); 

var buildLessTask = function (cb) {
  console.log("compiling less...");
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./bin/css'))
    .on('end', function(){
      console.log("less compilation complete");
    });
};
gulp.task('build-less', buildLessTask);
 
var buildViewsTask = function(cb){
  harp.compile("views", "../bin/_views", function(errors, output){
    console.log("Compiling views with harp...");
    gulp.src(["bin/_views/**/*.*"])
        .pipe(gulp.dest("bin"))
        .on('end', function(){
          console.log("finished compiling views");
          del(["bin/_views"]);
          cb();
        })
  });
};
gulp.task('build-views', buildViewsTask);

gulp.task("default", function(){
	console.log("Nothing to see here");
});

gulp.task("build-without-clean", gulpsync.sync(["build-less", "build-ts", "build-views"]));

gulp.task("build", gulpsync.sync(["clean", "build-without-clean"]), function(){

});

var zipTask = function () {
    return gulp.src('bin/**/*.*')
        .pipe(zip('release.zip'))
        .pipe(gulp.dest('dist'));
};
gulp.task('zip', ["build"],zipTask);

gulp.task("watch", ["build"], function(){
  gulp.watch(['less/**/*.less'], buildLessTask);
  gulp.watch(['views/**/*.*'], buildViewsTask);
  gulp.watch(['src/**/*.ts'], buildTsTask);
});