import React from 'react'

export default class BindEvent extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return <div>
            {/* 写法错误,无需点击直接会被调用 */}
            {/* <button onClick={this.myClickHandler()}>按钮</button> */}
            {/* 写法不规范,虽然可用 */}
            {/* <button onClick={this.myClickHandler}>按钮</button>  */}
            {/* 规范写法, 箭头函数格式 */}
            <button onClick={()=>{this.myClickHandler()}}>按钮</button> 
        </div>
    }

    // myClickHandler() {
    //     console.log('myClickHandler')
    // }

    myClickHandler = ()=>{
        console.log('myClickHandler')
    }
}





