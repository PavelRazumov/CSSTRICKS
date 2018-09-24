var gulp = require('gulp');
var less = require('gulp-less');
var gulp = require('gulp');
var svg_store = require('gulp-svgstore');
var inject = require('gulp-inject');
var svgmin = require('gulp-svgmin');
var path = require('path');
var debug = require('gulp-debug');

gulp.task('less', function () {
    return gulp.src('assets/style/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});
/*
gulp.task("svg", () => {
    let svgs = gulp
        .src('assets/image/site_image/menu_image/*.svg')
        .pipe(svgmin(function (file) {
            let prefix = path.basename(file.relative, path.extname(file.relative));

            return {
                plugins: [
                    {
                        removeTitle: true
                    },
                    {
                        removeAttrs: {
                            //attrs: "(fill|stroke)"
                        }
                    },
                    {
                        removeStyleElement: true
                    },
                    {
                        cleanupIDs: {
                            prefix: prefix + "-",
                            minify: true
                        }
                    }
                ]
            }
        }))
        //.pipe(rename({prefix: "icon-"}))
       
        .pipe(svg_store());

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return gulp

        
        .pipe(inject(svgs, {transform: fileContents}))
        .pipe(debug())
        .pipe(gulp.dest("svg"));
});
*/

gulp.task('svgstore', function () {
    return gulp
        .src('assets/image/site_image/menu_image/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svg_store())
        .pipe(gulp.dest('test/dest'));
});


gulp.task('svg', function () {
    var svgs = gulp
        .src('assets/image/site_image/**/*.svg')
        .pipe(svg_store({ inlineSvg: true }));
 
    function fileContents (filePath, file) {
        return file.contents.toString();
    }
 
    return gulp
        .src('index.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('./'));
});

browserSync = require('browser-sync').create();

gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("assets/styles/components/**/*.less", gulp.series('less'));
    //Событие при изменении
    gulp.watch("*.html").on('change', browserSync.reload);
});