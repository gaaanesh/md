var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var rigger      = require('gulp-rigger');
// var image = require('gulp-image');
// var reload      = server.reload;

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /docs/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("docs/js"))
        .pipe(browserSync.stream());
});

// gulp.task('image', function(cb) {
//    var file_src = 'src/assets/images/*.*', file_dest = 'docs/assets/images/';
//    gulp.src(file_src).pipe(gulp.dest(file_dest)).on('end', cb).on('error', cb);

// // gulp.task('image', function() {
// //     return gulp.src(['src/assets/images/*.*'])
// //          // .pipe(image())
// //         .pipe(gulp.dest("docs/assets/images/"))
// //         .pipe(browserSync.stream());
// });

gulp.task('rigger', function () {
      return gulp.src(['src/*.html'])
        .pipe(rigger())
        .pipe(gulp.dest("docs")) 
        // .pipe(reload({stream:true}));
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass','rigger'], function() {

    browserSync.init({
        server: "./docs/"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch(['src/*.html', 'src/*/*.html'], ['rigger']);
    // gulp.watch(['src/assets/images/*.*', 'docs/assets/images/'], ['image']);
    gulp.watch("docs").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve','rigger']);