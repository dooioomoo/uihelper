function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

//获取环境变量

// const dotenv = require("dotenv");
// dotenv.config();

try {
    //appJs路径设置
    global.JsApp = requireLocal(importPath + "js/js-require.js");

} catch (error) {
    global.JsApp = { list: [] };
}

//全局设定
global.settings = require('./settings')
global.build = require('./build')
global.task = require('./task')
global.watch = require('./watch')

// 基本清理
global.cleanFile = {
    clear: (cb) => {
        return build.clean(settings.base.clearFolder);
    }
};
