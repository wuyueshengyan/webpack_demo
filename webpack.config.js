// 在node里面，如果你涉及到路径的操作，一定要引入核心模块path
const path = require('path')

// 文本pack的配置文件遵循着CommonJS规范
module.exports = {
    // 决定入口文件
    entry: './src/index.js',
    output: {
        //出口path必须是一个绝对路径
        // path.resolve()解析当前相对路径的绝对路径
        // path:path.resolve(__dirname,'./dist/'),
        // 拼接路径
        // path:path.jion(__dirname,'./dist/'),

        path: path.resolve('./dist/'),
        filename: 'bundle.js'
    },
    // 打包
    // production 产品阶段，打包后会压缩混淆代码
    // development 开发阶段，打包
    mode: 'development',
    // 开启监视模式，此时执行webpack指令进行打包回监视文件的变化自动打包
    // watch: true
    devServer: {
        open: true,
        port: 3000,
        compress: true,
        hot: true,
        contentBase: './src',

    },
    // loder的配置
    modul: {
        // rules是规则的意思
        rules: [{
            test: /\.css$/,
            // webpack读取loader时 ， 是从右到左的读取,会将css文件先交给最右侧的loader来处理
            // loader的执行方式是从右到左以管道的方式链式调用
            // css-loader,解析css文件
            // style-loader,将解析出来的结果放到html中,使其生效
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.less$/,
            // 先less-loader解析less文件，再css-loader解析css文件。style-loader导入到HTML文件中
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.s(a|c)ss$/,
            // 编译scss的文件
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(jpg | ipeg | png | bmp | gif | woff | woff2 | eot | svg |ttf)$/,
            // 编译图片，字体图标的编译插件 npm i file-loader -d
            use: 'file-loader'
        }, {
            // 也可以分开写
            test: /\.(woff | woff2 | eot | svg |ttf)$/,
            // 编译图片，字体图标的编译插件
            use: 'file-loader'
        }, {
            test: /\.(jpg | ipeg | png | bmp | gif | woff | woff2 | eot | svg |ttf)$/,
            // 编译图片，字体图标的编译插件 npm i file-loader -d
            use: {
                loader: 'url-loader', //会把你所有的图片打包在同一个目录下
                options: {
                    limit: 5 * 1024, //如果你的图片小于5kb，就装换为base64
                    outputPath: 'img', //直接输入目录名字，指定输出图片的文件夹 其实是file-loader的功能
                    name: '[name]-[hash：4].[ext]' //[name]原来的名字 [hash:4] 哈希值为4位  .[ext]原后缀名  其实是file-loader的功能
                }
            }
        }, {
            text: /\.js$/,
            use: {
                loader: 'file-loader',
                options: {
                    presets: ['@babel/env'], //这个必须配置
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-transform-runtime'
                    ]
                }
            }
        }]
    }
}


// babel 插件 处理js代码
// npm i babel-loader @babel/core @babel/preser-env webpack -D
// 如果需要支持更高的语法，可以继续安装插件 比如class类
// npm i @babel/plugin-proposal-class-properties -D  也可自己去babel官网自己找插件安装 有很多类似的包 babel已经高度模块化了

// 如果使用generator，无法直接使用babel进行转换，因为会将generator转换为一个regeneratorRuntime，然后用Mark和wrap来实现generator
// 但是由于babel并没有内置regeneratorRuntime，所以无法使用
// regeneratorRuntime is not defined
// 在浏览器中直接使用是没有问题的

// 需要安装@babel/plugin-transform-runtime 然后和@babel/runtime
// @babel/plugin-transform-runtime -d  开发依赖
// @babel/runtime - s 运行依赖  会帮我们引用一个regenerator的js文件

// babel官方推荐用法 .babel 避免的webpack的js文件变得庞大


// npm i url-loader url-loader是对'file-loader的包装，然后必须装file-loader 会把图片变成base64格式 还会改变你的名字，生成一个唯一标识

// 自定义图片打包路径
//  

// npx webpack -- cpnfig 指定你要用的自定义的配置文件
// 我们可以在packge.json文件里面的script里面新建自定义的指令
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
// "build":"webpack --config webpack.custom.config.js" webpack.custom.config.js 就是你要执行的自定义的配置文件
// 这个时候你只需执行npm run build 就可以自动找到你packge.json上面的自定义指令进行打包
//   }
// 也可以使用webpack-dev-server 
// 先要安装这个依赖，先要安装好webpack 他也是一个开发依赖，只有在开发中，我们才会遇到，
// 安装 npm i webpack-dev-server -D
// dev-server会在内存中生成一个js文件，不会在硬板中生成，第一次生成的时候，会提示你文件存放路径
// dev-server 的作用非常简单，就是生成了一个express服务器，把我们的项目托管在上面。

// webpack-dev-server --compress --hot  --port 5000 --open -- contentBase src
// --hot 热模块更替  好处：每次更新之后，会以打补丁的方式更新，修改哪里，就更新哪里
// --port 5000 5000端口运行
// --open自动打开页面
// --contentBase更改项目根目录
// --compress 开启代码压缩

// 还可以直接在webpack.config.js里面加这些方法，新增节点


// html插件加上dev-server如虎添翼
// 所有的插件用法都是一样 
// 1.安装html-webpack-plugin插件 npm i html-webpack-plugin -D
// 在webpack.config.js中的plugins节点下配置

// 倒进来
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// 插件就是一个构造函数，一个平级节点plugins，在webpack里面所有带s的都是一个数组
// plugins: [
//     new HtmlWebpackPlugin({
// HTML打包的名字,在内存中生成一个HTML
//         filename: 'index.html',

//         template: './src/index.html'
//     })
// ]
// html的插件的作用就是根据一个模板来生成一个HTML文件，自动引入band.js，打包的时候可以生成HTML和js

// 插件
// 1.DevServer时根据模板在express项目根目录下生成HTML文件（类似DevServer生成内存中的bundle.js
// 2.DevServer时自动引入bundle.js
// 3.打包时会自动生成index.html


// webpack-dev-middleware要你自定义一个服务器，dev-server是别人给你定义好了一个服务器，webpack-dev-middleware有更多的自主性。和操作空间

// 注意，如果使用middleware，必须使用html-webpack-plugin插件，否则html文件无法正确输出到express服务器的根目录

// 只有在开发时才需要使用自动编译工具
// 项目上线时都会直接使用webpack进行打包构建，不需要使用这些自动编译工具

// webpack是vue的编译，命令合集