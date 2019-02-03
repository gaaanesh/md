var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
// var rigger      = require('gulp-rigger');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'docs/scss/*.scss'])
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

// gulp.task('rigger', function () {
//    var file_src = '*.html';
//     gulp.src(file_src)
//         .pipe(rigger())
//         .pipe(gulp.dest("*"))
//         .pipe(browserSync.stream());
// });

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'docs/scss/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);