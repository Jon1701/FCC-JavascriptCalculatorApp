// Import gulp.
var gulp = require("gulp");

// Paths
var srcPath = "./src/";
var destPath = "./build/";
var modulesPath = "./node_modules/";

// Move HTML.
gulp.task("html", function() {
  gulp.src(srcPath + "*.html")
    .pipe(gulp.dest(destPath));
});

// Move JavaScript.
gulp.task("javascript", function() {
  gulp.src(srcPath + "js/*.js")
    .pipe(gulp.dest(destPath + "js"));
});

// Move jQuery.
gulp.task("jquery", function() {
  gulp.src(modulesPath + "jquery/dist/jquery.js")
    .pipe(gulp.dest(destPath + "js/vendor/"));
});

// Move Bootstrap.
gulp.task("bootstrap", function() {
  gulp.src(modulesPath + "bootstrap/dist/**/*")
    .pipe(gulp.dest(destPath + "components/bootstrap"));
});

// Move stylesheets.
gulp.task("stylesheets", function() {
  gulp.src(srcPath + "css/*.css")
    .pipe(gulp.dest(destPath + "css"));
});

// Watch task
gulp.task("watch", function() {
  gulp.watch(srcPath + "*.html", ["html"]);
  gulp.watch(srcPath + "js/*.js", ["javascript"]);
  gulp.watch(srcPath + "css/*.css", ["stylesheets"]);
});


// Default task.
gulp.task("default", ["watch", "html", "javascript" ,"bootstrap", "jquery", "stylesheets"]);
