// 1. 这两个导入时候，接收的成员名称，必须这么写
import React from 'react' // 创建组件、虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' // 把创建好的 组件 和 虚拟DOM 放到页面上展示的

/*
在 jsx 中混合写入 js 表达式：在 jsx 语法中，要把 JS代码写到 `{ }` 中

- 渲染数字
- 渲染字符串
- 渲染布尔值
- 为属性绑定值
- 渲染jsx元素
- 渲染jsx元素数组
- 将普通字符串数组，转为jsx数组并渲染到页面上【两种方案】
*/

let a = 12
let str = 'hello world'
let bool = false
let title = 'title 123'
const h2 = <h2 title="H2H2H2">我是H2</h2>
const arr = [< h3 title = "H3H3H3" > 我是H3 < /h3>,
    <h4 title = "H4H4H4">我是H4</h4 >]

const arrstr = ['小米', 'Apple', '华为', 'oppo', 'vivo']
// 定义一个空数组,将来用来存放 名称 标签 [方案1]
const phoneArr = []

arrstr.forEach(item => {
    const temp = <h5 key={item}>{item}</h5>
    phoneArr.push(temp)
})

// 定义一个空数组,将来用来存放 名称 标签 [方案2]
arrstr.map(item => {
    return item + '!!!'
})

ReactDOM.render(
    <div>
    {a + 10000}
    <hr></hr>
    {str}
    <hr/> {bool
        ? '真的'
        : '假的'}
    <hr/>
    <p title={title}>pppp标签</p>
    <hr/> {h2}
    <hr/> {/* {arr} */}
    <hr/> {phoneArr}
    <hr/> {/* {arrstr.map(item => {
        return <h6>{item + '!!!'}</h6>
    })} */}
    {arrstr.map(item =>
    // 注意： React 中，需要把 key 添加给 被 forEach 或 map 或 for 循环直接控制的元素 <h6 key =
    // {item}>{item + '!!!'}</h6> < div key = {
        item
    } > <h6 >{item + ' !!! '}</h6> < /div> 
    )}
    <hr/> {/* 需要使用`className` 来替代 `class`；`htmlFor`替换label的`for`属性 */}
    <div className="className">className</div>
    <label htmlFor="forlabel">label</label>

</div>, document.getElementById('app'))
// Target container is not a DOM element.  经过分析，猜测：第二个参数接收的应该是一个  DOM 元素而不是 选择器