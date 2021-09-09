const path = require('path');
global.requireLocal = function (name) {
    return require(path.join(__dirname, name))
}
const importPath = "./{{src}}/";
require(importPath + "gulpfiles/init")

//服务器端全局框架编译
exports.common = build.gulp.series(
    task.sass.default, task.js.default, task.js.default_esm, task.image.default, task.fonts.default,
    task.sass.bootstrap5, task.js.bootstrap5, task.js.bootstrap5_esm, task.image.bootstrap5, task.fonts.bootstrap5,
);


//分支任务组
taskList = watch.tasks()
var defaultTask = []
//从watch.js获取所有分支列表，与文件检控同步
Object.keys(taskList).forEach(list => {
    defaultTask.push(taskList[list]);
    Object.defineProperty(exports, list, {
        value: build.gulp.series(taskList[list]),
        enumerable: true
    });
});
//默认任务
exports.default = build.gulp.series(
    defaultTask,
    cleanFile.clear
)
exports.watch = build.gulp.series(
    exports.default,
    build.gulp.parallel(watch.init, watch.reload, build.syncStart)
);
