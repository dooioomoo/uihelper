const gulp = require("gulp");
// const sass = require("gulp-sass");
const sass = require('gulp-sass')(require('sass'));
const gulpif = require("gulp-if");
const concat = require("gulp-concat");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const clean = require("gulp-clean");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const webpack_stream = require("webpack-stream");
const webpack = require('webpack');
const minify = require("gulp-minify");
const merge = require("merge-stream");
const browserSync = require('browser-sync').create();

module.exports = {
    gulp: gulp,
    sass: sass,
    gulpif: gulpif,
    concat: concat,
    cssnano: cssnano,
    merge: merge,
    autoprefixer: autoprefixer,
    plumber: plumber,
    rename: rename,
    postcss: postcss,
    webpack: webpack,
    webpack_stream: webpack_stream,
    minify: minify,
    clean: (list) => {
        return gulp.src(list, { read: false, allowEmpty: true }).pipe(clean({ force: true }));
    },
    syncStart: function (cb) {
        browserSync.init({
            //在setting修改成真实域名
            proxy: 'http://' + settings.server.name,
            baseDir: settings.server.root,
            open: "external",
        });
        cb();
    },
    syncReload: function (done) {
        browserSync.reload();
        done();
    }

}
