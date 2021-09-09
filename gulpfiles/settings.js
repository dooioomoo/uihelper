//默认样式后缀
exports.styleSuffix = '.css'
//默认设定
exports.base = {
    exportPath: exportPath,
    importPath: importPath,
    clearFolder: exportPath + "temp/",
    // globalFolder: globalFolder
}
//服务器设定
exports.server = {
    root: '/',
    name: serverName,
    port: '3000',
}

//scss编译设定
exports.sass = {
    common: {
        mini: true,
        import: [
            importPath + "scss/common/common.scss",
        ],
        export: [
            exportPath + "assets/css/",
        ],
    },
    app: {
        mini: true,
        import: [
            importPath + "scss/app/app.scss",
        ],
        export: [
            exportPath + "assets/css/",
        ],
    },
    app_mobile: {
        mini: true,
        import: [
            importPath + "scss/app/app_mobile.scss",
        ],
        export: [
            exportPath + "assets/css/",
        ],
    },
}

exports.js = {
    app: {
        mode: 'gulp',
        concat: true,
        mini: 1,
        import: JsApp.list.concat([
            importPath + "js/common/**/*",
            importPath + "js/core/**/*",
        ]),
        export: [
            exportPath + 'assets/js/'
        ],
    },
    app_mobile: {
        concat: true,
        mode: 'gulp',
        mini: 1,
        import: [
            importPath + "js/mobile/**/*",
        ],
        export: [
            exportPath + 'assets/mobile/js/'
        ],
    },
    single: {
        mode: 'gulp',
        concat: false,
        mini: 1,
        import: [
            importPath + "js/object/*.js"
        ],
        export: [
            exportPath + 'assets/js/single/'
        ],
    },
}
exports.images = {
    app: {
        import: [
            importPath + "imgs/**/*"
        ],
        export: [
            exportPath + 'assets/images/'
        ],
    },
}

exports.fonts = {
    app: [
        ["node_modules/@fortawesome/fontawesome-free/webfonts/**/*", exportPath + "assets/fonts/fontawesome"],
        [importPath + "fonts/**/*", exportPath + "assets/fonts"]
    ],
}


