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

var base_url = 'test-municipales-paris-2014-app';
var share_url = 'http://www.leparisienmagazine.fr/test-municipales-nkm-ou-anne-hidalgo-pour-qui-allez-vous-voter-111176/';
var share_text = "Municipales à Paris : voterez-vous NKM ou Anne Hidalgo ? En 20 questions, découvrez quel programme vous convient le mieux grâce au test du Parisien Magazine !" + share_url;
var share_status = "#MunicipalesParis : #NKM ou Anne #Hidalgo ? Découvrez quel programme vous convient le mieux ! via @leparisienmag " + share_url;

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
    })
        .pipe(clean());
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

// data
gulp.task('data', function() {
    gulp.src(['data/data.json'])
        .pipe(gulp.dest('app/data'));
});

// default
gulp.task('default', ['sass', 'data']);

// setup
gulp.task('setup', ['clean', 'bower', 'default']);

// watch
gulp.task('watch', function() {
    gulp.watch('data/import.rb', function() {
        var child = spawn("data/import.rb", [], {
            cwd: process.cwd()
        }),
            stdout = '',
            stderr = '';

        child.stdout.setEncoding('utf8');
        child.stdout.on('data', function(data) {
            stdout += data;
            gutil.log(data);
        });
        child.stderr.setEncoding('utf8');
        child.stderr.on('data', function(data) {
            stderr += data;
            gutil.log(gutil.colors.red(data));
            gutil.beep();
        });
        child.on('close', function(code) {
            gutil.log("Done with exit code", code);
        });
        gulp.run('data');
    });
    gulp.watch('app/scss/*.scss', function() {
        gulp.run('sass');
    });
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