import React, { Component } from 'react'
import SelfTable from '../../..//part/table'
import { opComponent } from '../../../operate'

export default class ReportStaff extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h1>店员管理报表</h1>
                <SelfTable columns={this.props.oriData.th} tableData={this.props.oriData.tableData} total={this.props.oriData.count} 
                    onchange={this.props.onchange}/>
            </div>
        )
    }
}

var basicConfig = {
    api: {
        list: {
            type: 'get',
            url: '/Report/clerkAction',
            listKey: 'item'
        }
    },
    th: [{
        title: '供应商名称',
        dataIndex: 'vendorName'
    },{
        title: '所在省',
        dataIndex: 'province'
    },{
        title: '所在市',
        dataIndex: 'city'
    },{
        title: '店员姓名',
        dataIndex: 'clerkerName'
    },{
        title: '门店名称',
        dataIndex: 'storeName'
    },{
        title: '员工工号',
        dataIndex: 'clerkerNo'
    }]
}
export const OpReportStaff = opComponent(ReportStaff, basicConfig)