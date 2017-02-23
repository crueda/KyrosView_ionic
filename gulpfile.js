var gulp = require('gulp');
var scp = require('gulp-scp');
var markdown = require('gulp-markdown');
var rename = require('gulp-rename');


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


