module.exports = () => {
  blinker.gulp.task('lint', () => {
    return blinker.gulp
      .src([`./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/**/*.js`])
      .pipe(blinker.plugins.eslint({}))
      .pipe(blinker.plugins.eslint.format());
  });
};
