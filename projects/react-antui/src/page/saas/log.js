import React from 'react';
import Operate from '../operate'
import { opComponent } from '../operate'
import SelfTable from '../part/table'

import { Table } from 'antd'


var tableTh = [
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
]

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
                <SelfTable tableData={this.props.oriData.tableData} />
                <Table columns={tableTh} dataSource={this.props.oriData.tableData} />
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
    }
}

// 导出高阶组件生成的组件
export const OpLog = opComponent(SaLog, baseConfig)