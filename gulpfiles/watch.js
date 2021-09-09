var bindTask = function (target) {
    target.on('change', function (path, stats) {
        console.log(`File ${path} was changed`);
    });
    target.on('add', function (path, stats) {
        console.log(`File ${path} was added`);
    });
    target.on('unlink', function (path, stats) {
        console.log(`File ${path} was removed`);
    });
}

//这里控制了所有默认分支任务的列表
global.watchList = {
    sass: [
        [settings.base.importPath + "scss/app/**/*"],
        [task.sass.common, task.sass.app, task.sass.app_mobile]
    ],
    js: [
        [settings.base.importPath + "js/**/*"],
        [task.js.app, task.js.single, task.js.app_mobile]
    ],
    image: [
        settings.images.app.import,
        [task.image.app]
    ],
    fonts: [
        settings.base.importPath + "fonts/**/*",
        [task.fonts.app]
    ],

}

module.exports = {
    tasks: () => {
        var taskList = {};
        Object.keys(watchList).forEach(directory => {
            taskList[directory] = watchList[directory][1];
        });
        return taskList;
        // done();
    },
    init: (done) => {
        Object.keys(watchList).forEach(directory => {
            let task = watchList[directory];
            let watcher = build.gulp.watch(
                task[0],
                build.gulp.parallel.apply(build.gulp, task[1])
            );
            bindTask(watcher);
        });
        return done();
    },
    reload: (done) => {
        // console.log(settings.base.exportPath);
        build.gulp.watch(
            [settings.base.exportPath + "**/*", "./**/*.php", "./**/*.html"],
            build.syncReload
        );
        return done();
    }
}
