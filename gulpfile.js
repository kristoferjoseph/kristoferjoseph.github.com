var gulp         = require('gulp');
var sass         = require('gulp-sass');
var cssmin       = require('gulp-cssmin');
var htmlmin      = require('gulp-htmlmin');
var processhtml  = require('gulp-processhtml');
var cssfont64    = require('gulp-cssfont64');
var livereload   = require('gulp-livereload');
var imagemin     = require('gulp-imagemin');
var browserify   = require('browserify');
var uglify       = require('gulp-uglify');
var source       = require('vinyl-source-stream');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker     = require('css-mqpacker');
var csswring     = require('csswring');

gulp.task('default', ['css', 'js', 'image', 'html']);

gulp.task('font', function() {
  return gulp.src('./src/fonts/*.woff')
    .pipe(cssfont64())
    .pipe(gulp.dest('./src/css/fonts'));
});

gulp.task('css', function() {
  var preprocessors = [
    autoprefixer,
    mqpacker,
    csswring
  ];
  return gulp.src('./src/css/index.scss')
    .pipe(sass())
    .pipe(postcss(preprocessors))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
});

gulp.task('js', function() {
  return browserify('./src/js/entry.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(processhtml())
    .pipe(htmlmin())
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('image', function() {
  return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/**/*.{scss,js,html}', ['css','js','html']);
});

