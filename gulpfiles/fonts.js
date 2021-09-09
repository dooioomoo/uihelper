var moduleList = {}

moduleList.buildFonts = function (target, done) {
    if (task.fonts.path[target] == undefined) {
        return done();
    }
    if (task.fonts.path[target].length < 1) {
        return done();
    }
    var importPath = task.fonts.path[target];
    var R = importPath.map(function (element) {
        return build.gulp
            .src(element[0])
            .pipe(build.plumber())
            .pipe(build.gulp.dest(element[1]));
    });
    return build.merge(R);
}

//创建基本fonts列表
var fontList = settings.fonts
//循环合并后的任务列表，并生成任务列表
Object.keys(fontList).forEach(List => {
    var name = List;
    var func = new Function("taskname", "return function " + [name + '_output_Fonts'] + " (cb){ return task.fonts.buildFonts(taskname,cb) ; }"
    );
    moduleList[name] = func(name)
})

//将合并的列表放入对象方便调用
moduleList.path = fontList
module.exports = moduleList
