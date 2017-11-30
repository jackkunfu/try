import React, { Component } from 'react'
import { opComponent } from '../../operate'

import SelfTable from '../../part/table'

export default class Account extends Component {


    render(){
        return (
            <div>
                <h1>账户管理</h1>
                <SelfTable columns={this.props.oriData.th} tableData={this.props.oriData.tableData} total={this.props.oriData.count} />
            </div>
        )
    }
}

var basicConfig = {
    api: {
        list: {
            type: 'get',
            url: '/account/index'
        }
    },
    th: [{
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
    }]
}
export const OpAccount = opComponent(Account, basicConfig)