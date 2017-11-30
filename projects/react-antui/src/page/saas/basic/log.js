import React from 'react';
import Operate from '../../operate'
import { opComponent } from '../../operate'
import SelfTable from '../../part/table'

import { Table } from 'antd'

export default class SaLog extends Operate {
    constructor(){
        super();
        this.state = {
            // tableData: [],
            api: {
                list: {
                    type: 'get',
                    url: '/log/index'
                }
            }
        }
    }

    async componentDidMount(){
        // this.init();
    }

    render(){
        return (
            <div>
                <h1>操作日志</h1>
                <SelfTable columns={this.props.oriData.th} tableData={this.props.oriData.tableData} total={this.props.oriData.count} 
                    onchange={this.pageChange}/>
                <Table columns={this.props.oriData.th} dataSource={this.props.oriData.tableData} pagination={{total: this.props.oriData.count}}/>
            </div>
        )
    }
}

// 高阶组件第二个传参配置
var baseConfig = {
    api: {
        list: {
            type: 'get',
            url: '/log/index'
        }
    },
    th: [
        {
            title: '操作',
            dataIndex: 'saction'
        },{
            title: '操作人',
            dataIndex: 'optName'
        },{
            title: '操作前',
            dataIndex: 'beforeModify'
        },{
            title: '操作后',
            dataIndex: 'afterModify'
        },{
            title: '操作类型',
            dataIndex: 'actionType'
        },{
            title: '所属店铺',
            dataIndex: 'storeName'
        }
    ]
}

// 导出高阶组件生成的组件
export const OpLog = opComponent(SaLog, baseConfig)