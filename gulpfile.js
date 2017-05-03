var gulp = require('gulp');
var scp = require('gulp-scp');
var markdown = require('gulp-markdown');
var rename = require('gulp-rename');
var rsync = require("rsyncwrapper");
var gutil = require('gulp-util');

gulp.task('default', function() {
  // place code for your default task here
});



// --------------------------------------------------------------------------------
// Generacion del changelog
// --------------------------------------------------------------------------------
gulp.task('gen-changelog', function () {
    return gulp.src('./CHANGELOG.md')
        .pipe(markdown())
        .pipe(gulp.dest('/Applications/MAMP/htdocs/webkyrosapp'))
        .pipe(gulp.src("/Applications/MAMP/htdocs/webkyrosapp/changelog.html"));

});

// --------------------------------------------------------------------------------


gulp.task('pro1', function() {
  rsync({
    ssh: true,
    src: '/Users/Carlos/Workspace/Kyros/KyrosMyPush/www',
    dest: 'root@192.168.28.136:/opt/KyrosMyPush/www',
    recursive: true,
    syncDest: true,
    args: ['--verbose']
  }, function(error, stdout, stderr, cmd) {
      gutil.log(stdout);
  });
});

