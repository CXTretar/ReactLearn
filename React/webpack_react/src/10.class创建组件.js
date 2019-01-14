console.log('ok')
import React from 'react'

class Audi {
    constructor(color, length){
        this.color = color
        this.length = length
    }
}

const audi = new Audi('orange', 5.5)
console.log(audi)

class CarMaker extends React.Component {
    // 构造器
    constructor(){
        // 由于 Movie 组件，继承了 React.Component 这个父类，所以，自定义的构造器中，必须 调用 super()
        super()
        // 只有调用了 super() 以后，才能使用 this 关键字
        this.state = {  // 这个 this.state = {} 就相当于 Vue 中的 data() { return { } }
            msg : '这是一个msg'
        }
    }

    // render 函数的作用，是 渲染 当前组件所对应的 虚拟DOM元素
    // 在 class 关键字创建的组件中，如果想使用 外界传递过来的 props 参数，不需接收，直接通过 this.props.*** 访问即可

   
    render(){
    // 注意：不论是 class 还是普通 function 创建的组件，它们的 props 都是只读的；
    // this.props.name = '李四'

    // 在 class 创建的组件中， this.state 上的数据，都是可读可写的！
        // this.state.msg = '这是一个新的msg'
        return <div>
            {/* 注意：在 class 组件内部，this 表示 当前组件的实例对象 */}
            
            这是CarMaker组件class -- {this.props.color } -- {this.props.length} -- {this.state.msg}
        </div>
    }
}

export default class AudiCar extends React.Component {
    render(){
        // return null
        return <div>
            这是新车
            <hr/>
            <CarMaker {...audi}></CarMaker>
            {/* <CarMaker color = {audi.color} length = {audi.length}></CarMaker> */}
         </div>
    }
}