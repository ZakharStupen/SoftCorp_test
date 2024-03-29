module.exports = () => {
  blinker.gulp.task('scripts:libraries', (done) => {
    if (blinker.config.javascript_libraries.length) {
      return blinker.gulp
        .src(blinker.config.javascript_libraries)
        .pipe(blinker.plugins.concat('libraries.js'))
        .pipe(
          blinker.gulp.dest(`${blinker.config.temporaryPath}/${blinker.config.javascriptDirectory}`),
        );
    }

    return blinker.gulp
      .src([`./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/libraries.js`])
      .pipe(
        blinker.gulp.dest(`${blinker.config.temporaryPath}/${blinker.config.javascriptDirectory}`),
      );
  });

  const scriptsProcess = (mode) => {
    if (blinker.config.use_webpack) {
      return blinker.gulp
        .src([
          `./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/*.js`,
          `!./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/libraries.js`,
        ])
        .pipe(blinker.plugins.named())
        .pipe(blinker.plugins.webpackStream(blinker.webpackConfig(mode), blinker.plugins.webpack))
        .pipe(
          blinker.gulp.dest(
            `${blinker.config.temporaryPath}/${blinker.config.javascriptDirectory}/`,
          ),
        )
        .pipe(
          blinker.plugins.browser_sync.reload({
            stream: true,
          }),
        );
    }

    if (blinker.config.use_babel) {
      return blinker.gulp
        .src([
          `./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/*.js`,
          `!./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/libraries.js`,
        ])
        .pipe(
          blinker.plugins.rollup(
            {
              plugins: [
                blinker.plugins.rollup_babel(),
                blinker.plugins.resolve(),
                blinker.plugins.commonjs(),
              ],
            },
            'umd',
          ),
        )
        .pipe(
          blinker.plugins.babel({
            ignore: [
              `./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/libs/**`,
              `!./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/libraries.js`,
            ],
          }),
        )
        .on('error', function (err) {
          console.error('[Compilation Error]');
          console.error(
            err.fileName + (err.loc ? `( ${err.loc.line}, ${err.loc.column} ): ` : ': '),
          );
          console.error('error Babel: ' + err.message + '\n');
          console.error(err.codeFrame);
          this.emit('end');
        })
        .pipe(
          blinker.gulp.dest(
            `${blinker.config.temporaryPath}/${blinker.config.javascriptDirectory}/`,
          ),
        )
        .pipe(blinker.plugins.browser_sync.reload({ stream: true }));
    }

    return blinker.gulp
      .src([
        `./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/*.js`,
        `!./${blinker.config.sourcePath}/${blinker.config.javascriptDirectory}/libraries.js`,
      ])
      .pipe(
        blinker.plugins.rollup(
          {
            plugins: [
              blinker.plugins.rollup_babel(),
              blinker.plugins.resolve(),
              blinker.plugins.commonjs(),
            ],
          },
          'umd',
        ),
      )
      .pipe(
        blinker.gulp.dest(`${blinker.config.temporaryPath}/${blinker.config.javascriptDirectory}/`),
      )
      .pipe(blinker.plugins.browser_sync.reload({ stream: true }));
  };

  blinker.gulp.task('scripts', () => {
    return scriptsProcess('development');
  });
  blinker.gulp.task('scripts:prod', () => {
    return scriptsProcess('production');
  });

  blinker.gulp.task('scripts:build', () => {
    let stream = blinker.gulp.src(
      `${blinker.config.temporaryPath}/${blinker.config.javascriptDirectory}/**/*.js`,
    );

    if (blinker.config.concatenate_scripts) {
      stream = stream
        .pipe(
          blinker.plugins.order(
            [
              `${blinker.config.temporaryPath}/${blinker.config.javascriptDirectory}/libraries.js`,
              `${blinker.config.temporaryPath}/${blinker.config.javascriptDirectory}/libs/*.js`,
              `${blinker.config.temporaryPath}/${blinker.config.javascriptDirectory}/**/*.js`,
            ],
            { base: './' },
          ),
        )
        .pipe(blinker.plugins.concat('all.js'))
        .pipe(
          blinker.gulp.dest(
            `${blinker.config.destinationPath}/${blinker.config.javascriptDirectory}`,
          ),
        );
    }

    if (blinker.config.js_source_maps) {
      stream = stream.pipe(blinker.plugins.source_maps.init());
    }

    // if (blinker.config.concatenate_scripts) {
    //   stream = stream.pipe(blinker.plugins.terser());
    // }

    if (blinker.config.minify_scripts) {
      stream = stream.pipe(blinker.plugins.terser());
    }

    if (blinker.config.js_source_maps) {
      stream = stream.pipe(blinker.plugins.source_maps.write());
    }

    if (blinker.config.concatenate_scripts) {
      stream = stream.pipe(blinker.plugins.rename('all.min.js'));
    }

    stream = stream.pipe(
      blinker.gulp.dest(`${blinker.config.destinationPath}/${blinker.config.javascriptDirectory}`),
    );

    return stream;
  });
};
