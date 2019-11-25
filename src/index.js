console.log('你好帅')
console.log('你好帅,小伙子')

// import 和 export语法必须在顶级作用域中使用，无法在子级使用

// 导入
// 会实现局部刷新，网页不会刷新
module.hot.accept('./hotmodule.js', function() {
    var hotmodule = require('./hotmodule.js')
    console.log(hotmodule)
})