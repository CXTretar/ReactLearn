
// 1. 这两个导入时候，接收的成员名称，必须这么写
import React from 'react' // 创建组件、虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' // 把创建好的 组件 和 虚拟DOM 放到页面上展示的


// 2. 创建虚拟DOM元素

// 渲染 页面上的 DOM 结构，最好的方式，就是写 HTML 代码
// 什么是虚拟DOM   用JS对象的形式，来表示 DOM 和 DOM 之间的嵌套关系
// const mytest = React.createElement('div', {id : 'aaa',title : 'aaa-title'}, mytest)

// HTML 是最优秀的标记语言；
// 注意： 在 JS 文件中，默认不能写 这种 类似于 HTML 的标记；否则 打包会失败；
// 可以使用 babel 来转换 这些 JS 中的标签；
// 大家注意：这种 在 JS 中，混合写入类似于 HTML 的语法，叫做 JSX 语法； 符合 XML 规范的 JS ；
// 注意： JSX 语法的本质，还是 在运行的时候，被转换成了 React.createElement 形式来执行的；
const mytest = <div id = "aaa" title = "aaa-title">mytest div元素<h1>我是H1</h1></div>

ReactDOM.render(mytest, document.getElementById('app'))
// Target container is not a DOM element.  经过分析，猜测：第二个参数接收的应该是一个  DOM 元素而不是 选择器