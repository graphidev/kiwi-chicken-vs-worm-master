/**
 * Gulp file
 * ===
 * This file require t
**/

var gulp = require('gulp');

/**
 * @task
 *
 * Images processor
 *
**/
gulp.task('styles', function() {

    var plumber = require('gulp-plumber');
    var postcss = require('gulp-postcss');
    var sourcemaps = require("gulp-sourcemaps");

    return gulp.src('./assets/src/css/*.css')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('postcss-import')(),
            require('postcss-custom-media')(),
            require('postcss-custom-properties')(),
            require('autoprefixer')({
                add: true,
                remove: true,
                cascade : true,
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
            }),
            require('postcss-reporter')({
                clearMessages: true
            })
        ]))
        .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./assets/dist/css'));

});

/**
 * Development task (default)
 * ---
**/
gulp.task('fonts', function() {

    return gulp.src('./assets/src/fonts/*')
    .pipe(gulp.dest('./assets/dist/fonts'));

});


/**
 * Development task (default)
 * ---
**/
gulp.task('default', ['styles', 'fonts'], function() {
 	gulp.watch('./assets/src/css/*.css', ['styles']);
 	gulp.watch('./assets/src/fonts/*', ['scripts']);
});


/**
 * Production task
**/
gulp.task('production', ['styles', 'fonts'], function() {

    gulp.src('./assets/dist/css/*.css')
    .pipe(require("gulp-cssnano")({
        autoprefixer: false,
        calc: false,
        colormin: true,
        convertValues: false,
        discardComments: true,
        discardDuplicates: false,
        discardEmpty: true,
        discardUnused: true,
        filterPlugins: false,
        mergeIdents: true,
        mergeLonghand: false,
        mergeRules: false,
        minifyFontValues: true,
        minifyGradients: false,
        minifySelectors: true,
        normalizeCharset: false,
        normalizeUrl: false,
        orderedValues: false,
        reduceIdents: true,
        reduceTransforms: false,
        svgo: true,
        uniqueSelectors: false,
        zindex: false,
    }))
.pipe(gulp.dest('./assets/dist/css/*.css'));

});
