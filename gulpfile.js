/* Requires */
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const jsmin = require('gulp-uglify');
const image = require('gulp-imagemin');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass')(require('node-sass'));
const rename = require('gulp-rename');

/* Funções */
function tarefaHTML() {
    return gulp.src('./src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
}
function tarefaCSS() {
    return gulp.src('./src/vendor/bootstrap/css/*.css')
        .pipe(concat('libs.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
}
function tarefaSASS() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
}
function tarefaJS() {
    return gulp.src('./src/vendor/bootstrap/js/*.js')
        .pipe(concat('libs.js'))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
}
function tarefaIMG() {
    return gulp.src('./src/img/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/img'))
}
/* Comandos */

exports.htmls = tarefaHTML;
exports.styles = tarefaCSS;
exports.scripts = tarefaJS;
exports.images = tarefaIMG;
exports.sass = tarefaSASS;

exports.default = parallel(tarefaHTML, tarefaCSS, tarefaSASS, tarefaJS);