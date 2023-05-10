module.exports = () => {
  blinker.gulp.task('clean:build',
    blinker.plugins.delete.bind(null, [
          blinker.config.temporaryPath,
          blinker.config.destinationPath + '/**',
          '!'+blinker.config.destinationPath,
          '!'+blinker.config.destinationPath + '/*.html',
          ...blinker.config.ignoreWhenPublicClean.map(item => '!' + blinker.config.destinationPath + item)
      ],
    {
      dot: true,
      force: blinker.config.allowCleanOutsideFrontend
    })
  );
  blinker.gulp.task('clean:dev',
    blinker.plugins.delete.bind(null, [blinker.config.temporaryPath], {dot: true})
  );
  blinker.gulp.task('clean:full',
      blinker.plugins.delete.bind(null, [
        blinker.config.temporaryPath,
        blinker.config.destinationPath,
        blinker.config.destinationPath + '/**',
        '!'+blinker.config.destinationPath,
        ...blinker.config.ignoreWhenPublicClean.map(item => '!' + blinker.config.destinationPath + item)
      ], {
        dot: true,
        force: blinker.config.allowCleanOutsideFrontend
      })
  );
};