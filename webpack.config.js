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
        contentBase: './src'
    }
}

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