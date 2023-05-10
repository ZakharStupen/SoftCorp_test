module.exports = () => {

  let tplPath = `${blinker.config.sourcePath}/${blinker.config.viewsDirectory}`;

  blinker.gulp.task('templates', function () {
    if (blinker.config.template_engine === 'twig') {
      return blinker.gulp.src(`${tplPath}/*.twig`)
          .pipe(blinker.plugins.twig({
              trace: false,
              debug: false,
              base: `${!!blinker.config.externalTemplatesAtRoot ? blinker.config.externalTemplatesAtRoot : tplPath }/`,
              ...blinker.twigSettings
          }))
        .pipe(blinker.gulp.dest(`${blinker.config.temporaryPath}`))
        .pipe(blinker.plugins.browser_sync.reload({stream: true}));

    } else
      if (blinker.config.template_engine === 'html') {
      return blinker.gulp.src([
        `${tplPath}/*.{html,htm}`,
      ])
        .pipe(blinker.gulp.dest(`${blinker.config.temporaryPath}`))
        .pipe(blinker.plugins.browser_sync.reload({stream: true}));
    }
  });
};