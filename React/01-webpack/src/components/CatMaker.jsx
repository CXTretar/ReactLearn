
import React from 'react'

// 第一种创建组件的方式
export default function CatMaker (props){
    // cat.age = 10
    console.log(props)
    // return null
    return <div>这是CatMaker组件-- {props.name + props.age + props.gender}</div>
}

// 把组件暴露出去
// export default CatMaker