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
    watch: true
}

// npx webpack -- cpnfig 指定你要用的自定义的配置文件
// 我们可以在packge.json文件里面的script里面新建自定义的指令
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
// "build":"webpack --config webpack.custom.config.js" webpack.custom.config.js 就是你要执行的自定义的配置文件
// 这个时候你只需执行npm run build 就可以自动找到你packge.json上面的自定义指令进行打包
//   }