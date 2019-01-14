//#region 介绍 React 中绑定事件的标准格式
// import React from 'react'

// export default class BindEvent extends React.Component {
//   constructor(){
//     super()
//     this.state = {}
//   }

//   render(){
//     return <div>
//       <button onClick={ () => this.show('🐷', '🍕') }>按钮</button>
//     </div>
//   }

//   show = (arg1, arg2) => {
//     console.log('show方法被调用了' + arg1 + arg2)
//   }
// }
//#endregion

//#region 绑定事件，并在事件处理函数中，使用 this.setState
import React from 'react'

export default class BindEvent extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: '呵呵呵呵呵呵呵'
        }
    }

    render() {
        return <div>
            <button onClick={ ()=>this.show('😈', '👻') }>按钮</button>
            <hr/>
            <h3>{this.state.msg}</h3>
        </div>
    }

    show = (arg1, arg2)=>{
        console.log('show方法被调用' + arg1 + arg2)
        // 注意：React 中，如果想为 state 中的数据，重新赋值，不要使用 this.state.*** = 值
        // this.state.msg = '哈哈哈哈'

        // 在 React 中，推荐使用 this.setState({ }) 修改 状态值
        // 在 setState ，只会把 对应的 state 状态更新，而不会 覆盖其它的 state 状态
        this.setState({
            msg: '哈哈哈哈' + arg1 + arg2
        })

        // 注意： this.setState 方法的执行，是异步的；
        // 如果大家在 调用完 this.setState 之后，又想立即拿到 最新的 state 值，需要使用 this.setState({}, callback)
        this.setState({
            msg: '哈哈哈哈' + arg1 + arg2
        }, function(){
            console.log(this.state.msg)
        })
    }

}
//#endregion







