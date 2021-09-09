const path = require('path');
global.requireLocal = function (name) {
    return require(path.join(__dirname, name))
}
///////////////////////////////////////////////////
//网站本地调试域名
global.serverName = 'localhost'
///////////////////////////////////////////////////
//输出位置
global.exportPath = "../";
//源文件位置
global.importPath = "src/";
///////////////////////////////////////////////////

require("./gulpfiles/init")
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
