/**
 * @file
 * Runs our tests.
 */

'use strict';

import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import mocha from 'gulp-spawn-mocha';
import sassTrue from 'sass-true';

let config = {};

config.sass = {
  src: 'test/sass',
  dest: 'test/css'
}

config.sassOptions = {
  includePaths: [
    config.sass.src,
    'stylesheets',
    'node_modules/sass-true/sass'
  ],
  outputStyle: 'expanded',
}

/**
 * Clean CSS files.
 */
const clean = function() {
  return del([config.sass.dest + '/**/*.css'], { force: true });
};

clean.description = 'Clean CSS files.';
gulp.task('clean', clean);

/**
 * Output CSS.
 */
const styles = function() {
  return gulp.src([config.sass.src + '/**/*.scss'])
    .pipe(sass(config.sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(config.sass.dest));
};

styles.description = 'Outputs CSS.';
gulp.task('styles', styles);

/**
 * Lint everything.
 */
const lint = function() {
  return gulp.src([config.sass.src + '/**/*.scss', 'stylesheets/**/*.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format());
};

lint.description = 'Lint everything.';
gulp.task('lint', lint);

/**
 * Run tests.
 */
const test = function() {
  return gulp.src('test/typey-test.js', { read: false })
    .pipe(mocha().on('error', function() { this.emit('end') }));
};

test.description = 'Run tests.';
gulp.task('test', test);

/**
 * Build.
 */
const build = gulp.series('clean', 'styles');

build.description = 'Build the test files.';
gulp.task('build', build);

/**
 * Watch, compile, lint and test.
 */
const watch = function(e) {
  gulp.watch([config.sass.src + '/**/*.scss', 'stylesheets/**/*.scss'], gulp.series('build', 'lint', 'test'));
}

watch.description = 'Watch, build, lint and test.';
gulp.task('watch', watch);

// Set the default task to build & watch.
gulp.task('default', gulp.series('build', 'lint', 'test', 'watch'));
