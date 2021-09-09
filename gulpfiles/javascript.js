const path = require('path');
const glob = require('glob');

var get_entry = function (list) {
    let reObj = {};
    list.forEach(element => {
        appU = element.split('/');
        filename = appU[appU.length - 1];
        reObj[filename.substring(0, filename.indexOf('.'))] = './' + element;
    });
    return reObj;
}

var moduleList = {}

moduleList.webpackBuild = function (target, done) {
    if (task.js.path[target].import == undefined || task.js.path[target].export == undefined) {
        return done();
    }
    if (task.js.path[target].import.length < 1 || task.js.path[target].export.length < 1) {
        return done();
    }
    let mini = (typeof task.js.path[target].mini == 'undefined' || task.js.path[target].mini != false);
    let concat = (typeof task.js.path[target].concat == 'undefined' || task.js.path[target].concat != false);
    let mini_ext = true;
    if (!mini) {
        mini_ext = false;
    } else {
        if (typeof task.js.path[target].mini_ext == 'undefined' || task.js.path[target].mini_ext != false) {
            mini_ext = true;
        } else {
            mini_ext = false;
        }
    }
    let jsext = mini_ext ? {
        min: ".min.js",
    } : { min: ".js", };
    let export_name = task.js.path[target].hasOwnProperty('name') ? task.js.path[target]['name'] : target
    var webpack_config = {
        mode: "production",
        cache: {
            type: 'filesystem',
            cacheDirectory: path.resolve(__dirname, settings.base.clearFolder)
        },
        optimization: {
            minimize: false,
        },
        resolve: {
            modules: ['node_modules', 'vendor', 'vendor/node_modules'],
        },
        performance: {
            hints: 'error',
            maxAssetSize: 80000000, // 整数类型（以字节为单位）
            maxEntrypointSize: 8000000 // 整数类型（以字节为单位）
        }
    };
    // var outputName = concat ? { filename: target + ".js" } : { filename: "[name].js" };
    if (concat) {
        webpack_config.output = { filename: export_name + ".js" }
    } else {
        webpack_config.output = { filename: "[name].js" }
    }
    if (!concat) {
        if (typeof task.js.path[target].import == 'object') {
            task.js.path[target].import.forEach((v, i) => {
                if (glob.sync(v).length)
                    webpack_config.entry = get_entry(glob.sync(v));
            });
        } else {
            if (glob.sync(task.js.path[target].import).length) {
                webpack_config.entry = get_entry(glob.sync(task.js.path[target].import));
            }
        }
    }
    // console.log(webpack_config);

    return build.gulp
        .src(task.js.path[target].import, { base: "./" })
        .pipe(build.webpack_stream(webpack_config))
        .pipe(build.gulpif(mini,
            build.minify({
                ext: jsext,
                ignoreFiles: [".combo.js", ".min.js", "-min.js"],
                noSource: true
            })
        ))
        .pipe(build.gulp.dest(task.js.path[target].export));

}

moduleList.gulpBuild = function (target, done) {

    if (task.js.path[target].import == undefined || task.js.path[target].export == undefined) {
        return done();
    }
    if (task.js.path[target].import.length < 1 || task.js.path[target].export.length < 1) {
        return done();
    }

    let mini = (typeof task.js.path[target].mini == 'undefined' || task.js.path[target].mini != false);
    let concat = (typeof task.js.path[target].concat == 'undefined' || task.js.path[target].concat != false);
    let mini_ext = true;
    if (!mini) {
        mini_ext = false;
    } else {
        if (typeof task.js.path[target].mini_ext == 'undefined' || task.js.path[target].mini_ext != false) {
            mini_ext = true;
        } else {
            mini_ext = false;
        }
    }
    let jsext = mini_ext ? {
        min: ".min.js",
    } : { min: ".js", };
    //是否指定输出文件名
    let export_name = task.js.path[target].hasOwnProperty('name') ? task.js.path[target]['name'] : target
    return build.gulp
        .src(task.js.path[target].import)
        .pipe(build.gulpif(concat, build.concat(export_name + ".js")))
        .pipe(build.gulp.dest(settings.base.clearFolder))
        .pipe(build.gulpif(mini,
            build.minify({
                ext: jsext,
                ignoreFiles: [".combo.js", ".min.js", "-min.js"],
                noSource: true
            })
        ))
        .pipe(build.gulp.dest(task.js.path[target].export));

}

//创建基本js编译列表
var jsList = settings.js

//循环合并后的任务列表，并生成任务列表
Object.keys(jsList).forEach(List => {

    var name = List;
    mode = (typeof jsList[List].mode != 'undefined' && jsList[List].mode == 'gulp');
    if (mode) {
        var func = new Function("taskname", "return function " + [name + '_javascript_gulp'] + " (cb){ return task.js.gulpBuild(taskname,cb) ; }");
    } else {
        var func = new Function("taskname", "return function " + [name + '_javascript_wp'] + " (cb){ return task.js.webpackBuild(taskname,cb) ; }");
    }
    moduleList[name] = func(name)
})
//将合并的列表放入对象方便调用
moduleList.path = jsList
module.exports = moduleList
