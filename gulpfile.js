var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    several_tasks = require('run-sequence');

var config = {
    'src': './src',
    'dest': './dist',
    'html': {
        'src': './src/*.html',
        'dest': './dist/'
    },

    'video':{
        'src':'./src/video/*',
        'dest':'./dist/video'
    },

    'css': {
        'src': [
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './src/css/styles.css',
            './src/css/media.css'
        ],
        'dest': './dist/styles/css'
    },

    'js': {
        'src': [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/isotope-layout/dist/isotope.pkgd.min.js',
            './node_modules/imagesloaded/imagesloaded.pkgd.min.js',
            './src/js/*.js'
        ],
        'dest': './dist/js'
    },

    'img': {
        'dest': './dist/images/',
        'src': './src/images/*'
    },

    'font': {
        'dest': './dist/fonts',
        'src': './src/fonts/**/*'
    }
};

gulp.task('minify:html', function () {
    return gulp.src(config.html.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.html.dest));
});

gulp.task('minify:img', function () {
    return gulp.src(config.img.src)
        .pipe(imagemin())
        .pipe(gulp.dest(config.img.dest));
});

gulp.task('minify:js', function () {
    return gulp.src(config.js.src)
        .pipe(concat('app.min.js'))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('minify:css', function () {
    return gulp.src(config.css.src)
        .pipe(autoprefixer({
            browsers: ['last 16 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(config.css.dest));
});

gulp.task('font', function () {
    return gulp.src(config.font.src)
        .pipe(gulp.dest(config.font.dest));
});

gulp.task('video', function () {
    return gulp.src(config.video.src)
        .pipe(gulp.dest(config.video.dest));
});

gulp.task('clean', function () {
    return gulp.src(config.dest, {read: false})
        .pipe(clean());
});

gulp.task('build', function () {
    several_tasks(['clean'],
        ['minify:html', 'minify:img', 'minify:js', 'minify:css', 'font', 'video']
    )
});
