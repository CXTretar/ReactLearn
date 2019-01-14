import React from 'react'
 
export default class BindInputValue extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: '呵呵呵呵呵呵呵',
            age: 22
        }
    }  
    
    render() {
        return <div>
            <button onClick={ ()=>{this.show('123', '888')} }>按钮</button>
            <hr/>
            <h3>{this.state.msg}</h3>
            <hr/>
            <input type="text" style={{width:"100%", border:"1px dashed #ccc"}}  value={this.state.msg} onChange={ (e)=>{this.txtChanged(e)} } ref="txt"></input>
        </div>
    }

    txtChanged = (e)=>{
        // console.log(e.target.value)
        // console.log(this.refs.txt.value)

        const newVal = e.target.value
        this.setState({
            msg: newVal
        })

    }


    show = (arg1, arg2)=>{
        this.setState({
            msg: '哈哈哈哈哈啊哈哈' + arg1 + arg2
        })

    }
}