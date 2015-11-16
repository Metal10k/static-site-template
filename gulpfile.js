var gulp = require('gulp');
var del = require("del");
var replace = require("gulp-replace-task");
var glob = require("glob");
var merge = require('merge-stream');
var fs = require('fs-extra');
var rename = require("gulp-rename");

function readFileIfExists(file) {
    try {
        var contents = fs.readFileSync(file, { encoding: "utf8" });
        return contents;
    }
    catch (e) {
        return '';
    }
}

function getOnlyName(filePathFull) {
	var thing = filePathFull.split("/").reverse()[0];
	console.log(thing);
	return thing;
}

gulp.task("clean", function () {
	return del(["bin"]);
});

gulp.task("build-views", function () {
	var views = glob.sync("./views/pages/**/body.html");

	var pipes = views.map(function (view) {

		console.log(view);
		var newFilePath = view.replace("./views/pages/", "").replace("/body.html", ".html");
		console.log(newFilePath);
		return gulp.src("views/template.html")
			.pipe(rename(newFilePath))
			.pipe(replace({
				patterns: [
					{
						match: 'body',
						replacement: readFileIfExists(view)
					},
					{
						match: 'something',
						replacement: readFileIfExists(view.replace("body.html", "something.html"))
					},
					{
						match: 'somethingelse',
						replacement: readFileIfExists(view.replace("body.html", "somethingelse.html"))
					}
				]
			}))
			.pipe(gulp.dest("./bin/views"));
	});

	return merge(pipes);
});

gulp.task("default", ["clean", "build-views"]);