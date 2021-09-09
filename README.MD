## 前端框架自动编译


+ ### npm i -g yarn && yarn

+ ### yarn build 会将src目录下的sass和js编译到../assets/**中去，具体配置参考./gulpfiles/gulp-settings.js

+ ### yarn sync 不仅通过watch来监视文件改动，并启动browersync自动新建代理，并刷新前端页面。监视改动文件在gulpfile.js中设置。

+ styleSuffix: ".css",//样式表文件后缀，可以设定wxss等

+ 样式文件less,sass,数据，加入时格式为如sass

```js
    sass{
        ...,

        样式组名称（如果组合会成为样式文件名）:{
                import: [   // 输入文件设置
                    importPath + "less/common/common.sass" //输入路径
                ],
                export: [  //输出位置设置
                    exportPath + "css/", //输出路径
                ],
        }
    }

```

路径设置可带参数

```js
/**
 * sass,less等编译参数
 * mode:'gulp', //mode不设置或者==webpack的时候使用webpack压缩，设置为其他时使用gulp压缩
 * mini:默认true,是否最小化
 * concat:默认true,是否合并,false时会输出独立文件。js情况下需要将import设置为字符串，不能是数组
 * single:默认false，是否直接单文件转换，会存放到scss文件同目录，webpack下无效
 * mini_ext:默认true，压缩式是否增加.min
 */

```

例如

```js
less: {
        common: {
            mini:false, //取消压缩
            concat:false, //取消文件合并，文件会按照目录结构输出位单个文件
            import: [
                importPath + "less/common/common.less"
            ],
            export: [
                exportPath + "css/",
            ],
        },
}

# import在webpack中等于入口文件。分列多个入口文件，需要重新设置一个组。

```

JS自动编译的三种模式：

+ 完全的js合并和压缩，一般用于jquery,bootstrap等文件的合并。

```js
common: {
    // [gulp] or [webpack].Set the js file merge mode
    mode: 'gulp',
    // Whether the compression
    mini: 1,
    // Whether merger
    concat: true,
    import: JsGlobal.list.concat([
        importPath + "js/common/**/*",
        importPath + "js/core/*.js",
    ]),
    export: [
        exportPath + 'js/'
    ],
},
```

+ 一种是自动合并，并使用webpack进行模块化编译和压缩

```js
app: {
    concat: true,
    mini: 1,
    import: [
        importPath + "js/object/*.js"
    ],
    export: [
        exportPath + 'js/'
    ],
},
```

+ 一种是使用webpack进行单文件编译，不合并，仅压缩,此时，import路径必须是*.js的字符串不可以是数组<br>这是将object/pages目录下的文件，逐个输出到js/pages目录下，并不包含子目录文件


```js
single: {
    concat: false,
    mini: 1,
    import: importPath + "js/object/pages/*.js",
    export: [
        exportPath + 'js/pages/'
    ],
},
```

功能完善中 ....

