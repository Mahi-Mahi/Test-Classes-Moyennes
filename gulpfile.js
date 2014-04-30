/* global require */
/* global process */
"use strict";

var gulp = require('gulp');

var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var bower = require('gulp-bower');

var autoprefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var sass = require('gulp-ruby-sass');

var clean = require('gulp-clean');
var replace = require('gulp-replace');
var fs = require('fs');

var rjs = require('gulp-requirejs');

// Sass
gulp.task('sass', function() {
    return gulp.src(['app/scss/*.scss'])
        .pipe(sass({
            compass: true
        }))
        .pipe(autoprefix())
        .pipe(csso())
        .pipe(gulp.dest('app/css'));
});

var base_url = 'test-classes-moyennes-app';
var share_url = 'http://www.leparisienmagazine.fr/test-classes-moyennes-111176/';
var share_text = "Faites-vous partie des classes moyennes ? Découvrez la réponse grâce au test du Parisien Magazine !" + share_url;
var share_status = "Test : faites-vous partie des classes moyennes ? via @leparisienmag " + share_url;

// html
gulp.task('html', function() {
    gulp.src(['app/partials/index.html'])
        .pipe(replace("[home-tmpl]", fs.readFileSync('app/partials/home.html', 'utf8')))
        .pipe(gulp.dest('app/'));
});

// Bower
gulp.task('bower', function() {
    gulp.src('app/vendor', {
        read: false
    });
    bower()
        .pipe(gulp.dest('app/vendor/'));
});

// Clean
gulp.task('clean', function() {
    gulp.src(['app/vendor', 'app/css', 'app/data/data.json'], {
        read: false
    })
        .pipe(clean());

});

// default
gulp.task('default', []);

// setup
gulp.task('setup', ['bower', 'default']);

// watch
gulp.task('watch', function() {
    // gulp.watch('app/scss/*.scss', function() {
    //     gulp.run('sass');
    // });
    gulp.watch('app/partials/*.html', function() {
        gulp.run('html');
    });
});

gulp.task('build', ['setup'], function() {

    /*
    gulp.src([base_url + '/'], {
        read: false
    })
        .pipe(clean());
*/
    gulp.src(['app/**'])
        .pipe(gulp.dest(base_url + '/'));
    gulp.src(['app/**/*.html', 'app/**/*.js', 'app/**/*.css', 'app/.htaccess'])

    .pipe(replace("SHARE_URL", encodeURIComponent(share_url)))
        .pipe(replace("SHARE_TEXT", encodeURIComponent(share_text)))
        .pipe(replace("SHARE_STATUS", encodeURIComponent(share_status)))

    .pipe(replace("/app/", '/' + base_url + '/'))
        .pipe(replace("CACHE_BUST", (new Date()).getTime()))
        .pipe(gulp.dest(base_url + '/'));

});