var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var connect = require('gulp-connect-php');


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'in/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("in/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /in/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("in/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
// gulp.task('serve', ['sass'], function() {

//     browserSync.init({
//         server: "./"  
//     });

    
//     // gulp.watch("in/*.html").on('change', browserSync.reload);
// });

gulp.task('connect-sync', ['sass'], function() {
  connect.server({}, function (){
    browserSync({
      proxy: '127.0.0.1:8000'
    });
  });
    
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'in/scss/*.scss'], ['sass'], ['connect-sync']);  
  gulp.watch('in/*.php').on('change', function () {
    browserSync.reload();
  });
  gulp.watch("in/*.*").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'connect-sync']);