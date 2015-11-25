var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var NwBuilder = require('nw-builder');
var webpack = require('webpack');
var del = require('del');



var config = require('./webpack.config');
var config_stage = require('./webpack.stage.config');
var config_production = require('./webpack.production.config');

var PACKAGE_JSON = require('./package.json');

gulp.task('webpack-d', function(done) {
  webpack(config, function (err, stats){
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({}));
    done();
  });
});


gulp.task('webpack-s', function(done) {
  webpack(config_stage, function (err, stats){
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({}));
    done();
  });
});


gulp.task('webpack-p', function(done) {
  webpack(config_production, function (err, stats){
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({}));
    done();
  });
});

gulp.task('nw-resource', function() {

  var resourcePath = './resource';

  del([resourcePath]);

  gulp.src(['*.html', 'semantic/**/*', 'dist/*.js', 'package.json', 'images/**/*'], {
    base: './'
  })
  .pipe(gulp.dest(resourcePath));

});


gulp.task('nw-build-del', function() {
  var buildDir = './build';
  del([buildDir]);
});

gulp.task('nw-build-win', function() {

  var buildDir = './build';

  var nw = new NwBuilder({
    files: ['resource/**/*'], // use the glob format
    version: '0.12.3',
    platforms: ['win32', 'win64'],
    appName: PACKAGE_JSON.name,
    appVersion: PACKAGE_JSON.version,
    buildDir: buildDir,
    winIco : 'images/logo.ico'
  });


  nw.on('log',  console.log);

  // Build returns a promise
  nw.build().then(function () {
    console.log('win all done!');
  }).catch(function (error) {
    console.error(error);
  });

});


gulp.task('nw-build-osx', function() {

  var buildDir = './build';


  var nw = new NwBuilder({
    files: ['resource/**/*'], // use the glob format
    version: '0.12.3',
    platforms: ['osx64'],
    appName: PACKAGE_JSON.name,
    appVersion: PACKAGE_JSON.version,
    buildDir: buildDir,
    macZip: true,
    macIcns : 'images/logo.icns'

  });


  nw.on('log',  console.log);

  // Build returns a promise
  nw.build().then(function () {
    console.log('osx all done!');
  }).catch(function (error) {
    console.error(error);
  });

});

gulp.task('nw-build', shell.task([
  'gulp nw-build-del',
  'gulp nw-build-win',
  'gulp nw-build-osx'
]));


gulp.task('stage', shell.task([
  'gulp webpack-s',
  'gulp nw-resource',
  'gulp nw-build'
]));

gulp.task('production', shell.task([
  'gulp webpack-p',
  'gulp nw-resource',
  'gulp nw-build'
]));