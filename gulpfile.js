/* Requires */
const { series, parallel } = require('gulp');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload();
const htmlmin = require('gulp-htmlmin');
const jsmin = require('gulp-uglify');
const image = require('gulp-imagemin');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

/* Funções */
function tarefaHTML() {
    return gulp.src('./src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
}
function tarefaCSS(callback) {
    gulp.src('./src/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: 'min'}))
        .pipe(gulp.dest('./dist/css'))
    return callback();
}
function tarefaJS() {
    return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.js')
        .pipe(concat('scripts.js'))
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
gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process);
    gulp.watch('./src/**/*').on('change', reload);
})
/* Comandos */
exports.default = process;
exports.process = series(tarefaCSS, tarefaHTML, tarefaJS);
exports.htmls = tarefaHTML;
exports.styles = tarefaCSS;
exports.scripts = tarefaJS;
exports.images = tarefaIMG;