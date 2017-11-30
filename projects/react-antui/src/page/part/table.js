import React from 'react'
import { Table } from 'antd'
import Utils from '../utils'

export default class SelfTable extends Utils {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.tableData,  //  props异步来的数据触发不了这层更新
            total: 0
        }
    }

    pageChange(page){
        console.log(page)
        this.props.onchange(page)
    }

    render(){
        // props传递过来的数据，貌似只有render方法里才能重新获取更新后的数据

        // 如果不需要重新处理数据，直接赋值this.props的数据就可以触发异步数据更新
        // return <Table columns={this.props.columns} dataSource={this.props.data} pagination={{total: this.props.total}} />

        // 需要处理下数据，可以获取下处理再赋值
        var data = this.props.tableData;
        var total = this.props.total;
        return <Table columns={this.props.columns} dataSource={data} pagination={{total: total}} onChange={this.pageChange.bind(this)} />
    }
}

// export const opTable = class {
//     render(){
//         return <Table columns={this.props.columns} dataSource={this.props.tableData} />
//     }
// }