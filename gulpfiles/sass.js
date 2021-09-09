var moduleList = {}

moduleList.buildSass = function (taskname, done) {
    if (task.sass.path[taskname].import == 'undefined' || task.sass.path[taskname].export == 'undefined') {
        return done();
    }
    if (task.sass.path[taskname].import.length < 1 || task.sass.path[taskname].export.length < 1) {
        return done();
    }
    //压缩判断
    let mini = (typeof task.sass.path[taskname].mini == 'undefined' || task.sass.path[taskname].mini != false);
    //sass自动增加前缀，兼容浏览器
    let postcss = mini ? [build.autoprefixer(), build.cssnano()] : [build.autoprefixer()];
    //合并多个css文件
    let concat = (typeof task.sass.path[taskname].concat == 'undefined' || task.sass.path[taskname].concat != false);
    //是否独立css文件
    let single = !(typeof task.sass.path[taskname].single == 'undefined' || task.sass.path[taskname].single != false);
    //是否增加.min间隔
    let mini_ext = true;
    if (!mini) {
        mini_ext = false;
    } else {
        if (typeof task.sass.path[taskname].mini_ext == 'undefined' || task.sass.path[taskname].mini_ext != false) {
            mini_ext = true;
        } else {
            mini_ext = false;
        }
    }
    //是否指定输出文件名
    let export_name = task.sass.path[taskname].hasOwnProperty('name') ? task.sass.path[taskname]['name'] : taskname

    return build.gulp
        .src(task.sass.path[taskname].import, { base: "./" })
        .pipe(build.plumber())
        .pipe(build.sass({ includePaths: [settings.server.root], outputStyle: "expanded" }))
        .pipe(build.gulpif(concat, build.concat(export_name + settings.styleSuffix)))
        .pipe(build.gulpif(single, build.gulp.dest(settings.base.clearFolder)))
        .pipe(build.gulpif(mini_ext, build.rename({ suffix: ".min" })))
        .pipe(build.rename({ extname: settings.styleSuffix }))
        .pipe(build.postcss(postcss))
        .pipe(build.gulp.dest(task.sass.path[taskname].export));
}

//创建基本sass列表
var sassList = settings.sass
//循环合并后的任务列表，并生成任务列表
Object.keys(sassList).forEach(List => {
    var name = List;
    var func = new Function("taskname", "return function " + [name + '_sass'] + " (cb){ return task.sass.buildSass(taskname,cb) ; }"
    );
    moduleList[name] = func(name)
})

//将合并的列表放入对象方便调用
moduleList.path = sassList
module.exports = moduleList
