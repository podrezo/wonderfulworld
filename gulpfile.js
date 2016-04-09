// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var htmlreplace = require('gulp-html-replace');
var cleanCSS = require('gulp-clean-css');
var connect = require('gulp-connect');

gulp.task('serve:dist', function() {
    connect.server({
        'root': 'dist'
    });
});

gulp.task('watch', function() {
    gulp.watch(['./**/*.html'], ['reloadHtml']);
    gulp.watch(['./js/*.js'], ['reloadHtml']);
    gulp.watch(['./css/*.css'], ['reloadCss']);
});

gulp.task('reloadHtml', function() {
    gulp.src(['./**/*.html'])
        .pipe(connect.reload());
});
gulp.task('reloadHtml', function() {
    gulp.src(['./js/*.js'])
        .pipe(connect.reload());
});
gulp.task('reloadCss', function() {
    gulp.src(['./css/*.css'])
        .pipe(connect.reload());
});

gulp.task('serve', ['watch'], function() {
    connect.server({
        'root': '../',
        'livereload': true
    });
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['js/**/*.js', 'lib/**/*min.js'])
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
    return gulp.src('css/**/*')
        .pipe(concat('all.css'))
        .pipe(cleanCSS({
            'processImport': false
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('db', function() {
    return gulp.src('db/**/*')
        .pipe(gulp.dest('dist/db'));
});

gulp.task('fonts', function() {
    return gulp.src('fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('img', function() {
    return gulp.src('img/**/*')
        .pipe(gulp.dest('dist/img'));
});
gulp.task('template', function() {
    return gulp.src('template/**/*')
        .pipe(gulp.dest('dist/template'));
});

gulp.task('clean', function() {
    return del(['dist/**/*']);
});


// Default Task
gulp.task('default', ['clean', 'lint', 'scripts', 'css', 'db', 'img', 'template'], function() {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'js': 'js/all.min.js',
            'css': 'css/all.css'
        }))
        .pipe(gulp.dest('dist/'));
});