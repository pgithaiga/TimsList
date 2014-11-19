var gulp       = require('gulp'),
    watch      = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    nodemon    = require('gulp-nodemon'),
    concat     = require('gulp-concat'),
    browserify = require('browserify'),
    jade       = require('gulp-jade'),
    through    = require('through2'),
    path       = require('path');

gulp.task('reload', function() {
  livereload.changed;
});

gulp.task('watch', function() {
  gulp.watch('./routes/*.js', ['reload']);
  gulp.watch('./views/templates/*.jade', ['templates']);
  gulp.watch('./views/*.jade', ['reload']);
  gulp.watch('./views/mixins/*.jade', ['reload']);
});

gulp.task('nodemon', function() {
  livereload.listen();
  nodemon({script: './bin/www', ext: 'html js'})
    .on('start', ['watch'])
    .on('restart', function() {
      livereload.changed;
      console.log('restarting server');
    });
});

gulp.task('templates', function() {
  gulp.src('./views/templates/*.jade')
      .pipe(jade({client: true}))
      .pipe(modify())
      .pipe(concat("templates.js"))
      .pipe(gulp.dest('./public/js/templates'))
});

function modify() {
  function transform(file, enc, callback) {
    if (!file.isBuffer()) {
      this.push(file);
      callback();
      return;
    }
    var funcName = path.basename(file.path, '.js');
    var from = 'function template(locals) {';
    var to = 'function ' + funcName + '(locals) {';
    var contents = file.contents.toString().replace(from, to);
    file.contents = new Buffer(contents);
    this.push(file);
    callback();
  }
  return through.obj(transform);
}

gulp.task('develop', ['templates', 'nodemon'])