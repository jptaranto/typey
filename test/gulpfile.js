'use strict';

var Promise = require('es6-promise').Promise;
var path = require('path');

var options = {};

// Define paths.
options.paths = {
    root  : __dirname + '/',
    app   : __dirname + '/app/',
    css   : __dirname + '/app/css/',
    sass  : __dirname + '/app/sass/',
    typey : __dirname + '/../stylesheets/'
};

// Define the node-sass/eyeglass configuration.
options.sass = {
    includePaths: [
      options.paths.sass,
      options.paths.typey
    ],
    outputStyle: 'expanded'
};

// If your files are on a network share, you may want to turn on polling for
// Gulp watch. Since polling is less efficient, we disable polling by default.
options.gulpWatchOptions = {};
// options.gulpWatchOptions = {interval: 1000, mode: 'poll'};

// Load Gulp and tools we will use.
var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),
    del         = require('del'),
    sass        = require('gulp-sass'),
    spawn       = require('child_process').spawn,
    eyeglass    = require('eyeglass'),
    sassLint    = require('gulp-sass-lint');

// The default task.
gulp.task('default', ['build']);

// Build everything.
gulp.task('build', ['styles', 'lint']);

// Build CSS.
gulp.task('styles', ['clean:css'], function() {
    return gulp.src(options.paths.sass + '**/*.scss')
            .pipe($.sourcemaps.init())
            .pipe(sass(eyeglass(options.sass)).on('error', sass.logError))
            .pipe($.size({showFiles: true}))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(options.paths.css))
            .pipe($.if(browserSync.active, browserSync.stream({match: '**/*.css'})));
});

// Lint Sass.
gulp.task('lint', ['lint:sass']);

// Lint Sass.
gulp.task('lint:sass', function() {
    return gulp.src([
              options.paths.sass + '**/*.scss',
              options.paths.typey + '**/*.scss'
            ])
            .pipe(sassLint())
            .pipe(sassLint.format());
});

// Watch for changes and rebuild.
gulp.task('watch', ['browser-sync']);

gulp.task('browser-sync', ['watch:css'], function() {
    return browserSync.init({
        server: {
          baseDir: options.paths.app,
          directory: true
        },
        open: false
    });
});

gulp.task('watch:css', ['styles', 'lint:sass'], function() {
    return gulp.watch(options.paths.sass + '**/*.scss', options.gulpWatchOptions, ['styles', 'lint:sass']);
});

// Clean all directories.
gulp.task('clean', ['clean:css']);

// Clean CSS files.
gulp.task('clean:css', function() {
    return del([
        options.paths.css + '**/*.css',
        options.paths.css + '**/*.map'
    ], {force: true});
});
