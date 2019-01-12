// 1. 这两个导入时候，接收的成员名称，必须这么写
import React from 'react' // 创建组件、虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' // 把创建好的 组件 和 虚拟DOM 放到页面上展示的
// 在构造函数中，使用 props 形参，接收外界 传递过来的数据, 可以改成cat之类的名称,最好用 props 导入CatMaker 组件
// 默认，如果不做单独的配置的话，不能省略 .jsx 后缀名 import CatMaker from './components/CatMaker'
// import CatMaker from './components/CatMaker.jsx' 注意： 这里的 @ 符号，表示 项目根目录中的 src
// 这一层目录
import CatMaker from '@/components/CatMaker'

const cat = {
    name: 'OC',
    age: 3,
    gender: ' 公 '
}

ReactDOM.render(
    <div>
    {/* <CatMaker name={cat.name} age={cat.age} sex={cat.gender}></CatMaker> */}
    <CatMaker {...cat}></CatMaker>
</div>, document.getElementById('app'))
// Target container is not a DOM element.  经过分析，猜测：第二个参数接收的应该是一个  DOM 元素而不是 选择器
// ... 为ES6语法中展开运算符
/* var o2 = {
  age: 22,
  address: '中国北京',
  phone: '139999'
}

var o1 = {
  name: 'zs',
  ...o2
}

console.log(o1) */