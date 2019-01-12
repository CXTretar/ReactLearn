import React from 'react'


// 第一层封装：将 样式对象 和 UI 结构分离
// const itemStyle = {border: '1px dashed #ccc', margin: '10px', padding: '10px', boxShadow: '0 0 10px #ccc'}
// const userStyle = {fontSize: '14px'}
// const contentStyle = {fontSize: '12px'}

// 第二层封装：合并成一个大的样式对象
// const styles = {
//     itemStyle : {border: '1px dashed #ccc', margin: '10px', padding: '10px', boxShadow: '0 0 10px #ccc'},
//     userStyle : {fontSize: '14px'},
//     contentStyle : {fontSize: '12px'}
// }
// 第三层封装：抽离为单独的 样式表 模块

// 无封装
// export default function CmtItem(props){
//     return <div style ={{border: '1px dashed #ccc', margin: '10px', padding: '10px', boxShadow: '0 0 10px #ccc'}}>
//         <h1 style={{fontSize: '14px'}}>评论人:{props.user}</h1>
//         <p style={{fontSize: '12px'}}>评论内容:{props.content}</p>
//     </div>
// }

// 第一层封装
// export default function CmtItem(props){
//     return <div style ={itemStyle}>
//         <h1 style={userStyle}>评论人:{props.user}</h1>
//         <p style={contentStyle}>评论内容:{props.content}</p>
//     </div>
// }

// 第二层封装
// export default function CmtItem(props){
//     return <div style ={styles.itemStyle}>
//         <h1 style={styles.userStyle}>评论人:{props.user}</h1>
//         <p style={styles.contentStyle}>评论内容:{props.content}</p>
//     </div>
// }

// 第三层封装
import styles from '@/components/styles'

export default function CmtItem(props){
    return <div style ={styles.itemStyle}>
        <h1 style={styles.userStyle}>评论人:{props.user}</h1>
        <p style={styles.contentStyle}>评论内容:{props.content}</p>
    </div>
}