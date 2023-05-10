"use strict";

global.blinker = {
  gulp: require('gulp'),
  config: require('./config.json'),
  core: require('./gulp/export.js'),
  webpackConfig: require('./webpack.config.js'),
  plugins: {
    eslint: require('gulp-eslint'),
    twig: require('gulp-twig'),
    sass: require('gulp-sass')(require('node-sass')),
    autoprefixer: require('gulp-autoprefixer'),
    csso: require('gulp-csso'),
    browser_sync: require('browser-sync'),
    rename: require('gulp-rename'),
    delete: require('del'),
    concat: require('gulp-concat'),
    babel: require('gulp-babel'),
    png_sprite: require('gulp.spritesmith'),
    merge: require('merge-stream'),
    imagemin: require('gulp-imagemin'),
    clean: require('gulp-clean'),
    file_exist: require('files-exist'),
    terser: require('gulp-terser'),
    order: require('gulp-order'),
    source_maps: require('gulp-sourcemaps'),
    svg_min: require('gulp-svgmin'),
    svg_sprite: require('gulp-svg-sprite'),
    cheerio: require('gulp-cheerio'),
    replace: require('gulp-replace'),
    inline_css: require('gulp-inline-css'),
    rollup: require('gulp-better-rollup'),
    rollup_babel: require('rollup-plugin-babel'),
    resolve: require('rollup-plugin-node-resolve'),
    commonjs: require('rollup-plugin-commonjs'),
    webpack: require('webpack'),
    webpackStream: require('webpack-stream'),
    named: require('vinyl-named'),
  },
  twigSettings: require('./twig/settings.js'),
};

blinker.core.forEach((taskPath) => {
  require(taskPath)();
});

if (blinker.config.critical_css) {
  blinker.plugins.critical = require('critical').stream;
}

blinker.core.errorHandler.initialize();

blinker.gulp.task(
  'dev',
  blinker.gulp.series(
    blinker.gulp.parallel('clean:dev'),
    blinker.gulp.parallel(
      'png-sprite',
      'images:copy',
      'ajax:copy',
      'fonts:copy',
      'svg:sprite',
      'svg:inline',
    ),
      blinker.gulp.parallel('lint'),
    blinker.gulp.parallel('templates', 'styles', 'scripts:libraries', 'scripts'),
    blinker.gulp.parallel('watch', 'serve'),
  ),
);

//build with html templates
blinker.gulp.task(
  'build-templates',
  blinker.gulp.series(
    blinker.gulp.parallel('clean:full'),
    blinker.gulp.parallel('png-sprite', 'images:copy', 'fonts:copy', 'svg:sprite', 'svg:inline'),
    blinker.gulp.parallel(
      'images:minify',
      'templates',
      'styles:build',
      'scripts:libraries',
      'scripts:prod',
    ),
    blinker.gulp.parallel('dist', 'scripts:build'),
    // blinker.gulp.parallel('styles:critical')
  ),
);

//build without html templates
blinker.gulp.task(
  'build',
  blinker.gulp.series(
    blinker.gulp.parallel('clean:build'),
    blinker.gulp.parallel('png-sprite', 'images:copy', 'fonts:copy', 'svg:sprite', 'svg:inline'),
    blinker.gulp.parallel('images:minify', 'styles:build', 'scripts:libraries', 'scripts:prod'),
    blinker.gulp.parallel('dist', 'scripts:build'),
    // blinker.gulp.parallel('styles:inline'),
    // blinker.gulp.parallel('styles:critical')
  ),
);

blinker.gulp.task(
  'build-watch',
  blinker.gulp.series(
    blinker.gulp.parallel('clean:build'),
    blinker.gulp.parallel('png-sprite', 'images:copy', 'fonts:copy', 'svg:sprite', 'svg:inline'),
    blinker.gulp.parallel('styles', 'scripts:libraries', 'scripts:prod'),
    blinker.gulp.parallel('images:minify', 'styles:build-watch'),
    blinker.gulp.parallel('dist', 'scripts:build'),
    blinker.gulp.parallel('watch', 'watch:build'),
  ),
);
