import React from 'react'
import { Table } from 'antd'
import Utils from '../utils'

export default class SelfTable extends Utils {
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            columns: [
                {
                    title: 'saction',
                    dataIndex: 'saction'
                },{
                    title: 'optName',
                    dataIndex: 'optName'
                },{
                    title: 'beforeModify',
                    dataIndex: 'beforeModify'
                },{
                    title: 'afterModify',
                    dataIndex: 'afterModify'
                },{
                    title: 'actionType',
                    dataIndex: 'actionType'
                },{
                    title: 'storeName',
                    dataIndex: 'storeName'
                }
            ],
            data: this.props.tableData   //  异步来的数据暂时触发不了这层更新
        }
    }

    render(){
        return(<Table columns={this.state.columns} dataSource={this.state.data}></Table>)
    }
}