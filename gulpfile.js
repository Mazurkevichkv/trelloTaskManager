var fs = require("fs");
var del = require("del");
var gulp = require("gulp");

var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var concat = require("gulp-concat");

/* MARKUP */
var pug = require("gulp-pug");
var htmltidy = require("gulp-htmltidy");

/* STYLES */
var sass = require("gulp-sass");
var sassModuleImporter = require("sass-module-importer");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var inlineSVG = require("postcss-inline-svg");
var csso = require("gulp-csso");
var stylelint = require("gulp-stylelint");

/* SCRIPTS */
var named = require("vinyl-named");
var webpack = require("gulp-webpack");

/* ASSETS */
var imagemin = require("gulp-imagemin");

/* MISC */
var notify = require("gulp-notify");
var browserSync = require("browser-sync");
var watch = require("gulp-watch");


var config = {
    plumber: function(title) {
        if(!title) title = "Untitled";
        return {
            errorHandler: function() {
                return notify.onError(function (error) {
                    return {
                        title: title + ": Error Handled",
                        message: error.message
                    };
                });
            }
        }
    }
};

gulp.task("markup", gulp.parallel(
    taskHtml,
    taskPug
));

gulp.task("styles", gulp.parallel(
    taskSass
));

gulp.task("scripts", gulp.parallel(
    taskJs
));

gulp.task("assets", gulp.parallel(
    taskImages,
    taskFonts
));

gulp.task("clean", taskClean);
gulp.task("serve", taskServe);
gulp.task("watch", taskWatch);

gulp.task("build", gulp.series("clean", gulp.parallel("markup", "styles", "scripts", "assets")));
gulp.task("default", gulp.series("build"));

function taskPug() {
    return gulp.src("./src/main/webapp/*.pug")
        //.pipe(plumber(config.plumber("Pug")))
        .pipe(pug({
            pretty: true
        }))
        .pipe(htmltidy({
            dropEmptyElements: false,
            tabSize: 2,
            indentSpaces: 2,
            indent: "auto",
            wrap: 0
        }))
        .pipe(gulp.dest("./src/main/resources/public/"));
}

function taskHtml() {
    return gulp.src(["./src/main/webapp/*.html"])
        .pipe(plumber(config.plumber("HTML")))
        .pipe(htmltidy({
            dropEmptyElements: false,
            tabSize: 2,
            indentSpaces: 2,
            indent: "auto",
            wrap: 0
        }))
        .pipe(gulp.dest("./src/main/resources/public/"))
}

function taskSass() {
    return gulp.src("./src/main/webapp/main.{sass,scss}")
        //.pipe(plumber(config.plumber("Sass")))
        .pipe(sourcemaps.init())
        .pipe(sass({
            importer: sassModuleImporter()
        }).on("error", sass.logError))
        .pipe(stylelint({
            reporters: [{
                formatter: "verbose",
                console: true
            }]
        }))
        .pipe(postcss([
            inlineSVG(),
            autoprefixer({
                browsers: ["> 1%", "last 2 versions", "Android >= 4"]
            })
        ]))
        .pipe(csso({
            restructure: false
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./src/main/resources/public/"))
}

function taskJs() {
    return gulp.src("./src/main/webapp/scripts/*.js")
        .pipe(plumber(config.plumber("JS")))
        .pipe(named())
        .pipe(webpack({
            watch: false,
            devtool: 'source-map',
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel-loader'
                    }
                ]
            },
            output: {
                libraryTarget: 'var',
                library: 'App'
            }
        }))
        .pipe(gulp.dest("./src/main/resources/public/scripts/"))
}

function taskImages() {
    return gulp.src("./src/main/webapp/assets/images/*.{jpg,jpeg,png,svg}", {since: gulp.lastRun("assets")})
        .pipe(plumber(config.plumber("Images")))
        //.pipe(newer("./src/main/resources/public/assets/images/"))
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(rename({
            dirname: ""
        }))
        //.pipe(debug({title: "images"}))
        .pipe(gulp.dest("./src/main/resources/public/assets/images/"));
}

function taskFonts() {
    return gulp.src("./src/main/webapp/assets/fonts/*/*.{woff,woff2}", {since: gulp.lastRun("assets")})
        .pipe(plumber(config.plumber("Fonts")))
        .pipe(rename(function(item) {
            item.dirname = item.dirname.split(path.sep).pop();
        }))
        //.pipe(debug({title: "fonts"}))
        .pipe(gulp.dest("./src/main/resources/public/assets/fonts/"));
}


function taskClean(done) {
    return del(["./src/main/resources/public/**", "!./src/main/resources/public"]);
}

function taskServe() {
    return browserSync({
        server: {
            baseDir: "./src/main/resources/public/"
        }
    });

    //browserSync.watch("./src/main/resources/public/!**!/!*.{css}").on("change", browserSync.reload);
}



function taskWatch() {
    /* MARKUP */

    gulp.watch("./src/main/webapp/**/*.pug", taskPug);

    /* STYLES */
    gulp.watch("./src/main/webapp/**/*.{sass,scss}", taskSass);

    /* SCRIPTS */
    //gulp.watch("./src/main/webapp/scripts/**/*.js", taskJs);
    //There is no need to do this because of webpack watcher
    
    
    /* ASSETS */
    gulp.watch("./src/main/webapp/assets/images/*.{jpg,jpeg,png}", taskImages);
    gulp.watch("./src/main/webapp/assets/fonts/*/*.{woff,woff2}", taskFonts);
}
