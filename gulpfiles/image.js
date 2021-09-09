var moduleList = {}

moduleList.imageBuild = function (target, done) {
    if (task.image.path[target].import == undefined || task.image.path[target].export == undefined) {
        return done();
    }
    if (task.image.path[target].import.length < 1 || task.image.path[target].export.length < 1) {
        return done();
    }
    return build.gulp
        .src(task.image.path[target].import)
        .pipe(build.plumber())
        .pipe(build.gulp.dest(task.image.path[target].export));
}

//创建基本photos列表
var imgList = settings.images
//循环合并后的任务列表，并生成任务列表
Object.keys(imgList).forEach(List => {
    var name = List;
    var func = new Function("taskname", "return function " + [name + '_output_Images'] + " (cb){ return task.image.imageBuild(taskname,cb) ; }"
    );
    moduleList[name] = func(name)
})

//将合并的列表放入对象方便调用
moduleList.path = imgList
module.exports = moduleList
