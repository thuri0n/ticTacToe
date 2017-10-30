var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('./index.html').on('change', browserSync.reload);
    gulp.watch('./js/scripts.js').on('change', browserSync.reload);

});

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});


gulp.task('default', ['browser-sync']);
