// 1. 这两个导入时候，接收的成员名称，必须这么写
import React from 'react' // 创建组件、虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' // 把创建好的 组件 和 虚拟DOM 放到页面上展示的

// import '@/10.class创建组件'
// import AudiCar from '@/10.class创建组件'
// import CarMaker from '@/10.class创建组件'
// import CatMaker from './components/CatMaker';
import CmtList from '@/components/CmtList2'
import BindEvent from '@/components/BindEvent'
import BindInputValue from '@/components/BindInputValue'

ReactDOM.render(<div>
    {/* 123 */}
    {/* <AudiCar></AudiCar> */}
    {/* <BindEvent></BindEvent> */}
    {/* <CmtList></CmtList> */}
    <BindInputValue></BindInputValue>
    </div>, 
    document.getElementById('app'))
// Target container is not a DOM element.  经过分析，猜测：第二个参数接收的应该是一个  DOM 元素而不是 选择器