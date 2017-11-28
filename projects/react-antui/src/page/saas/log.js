import React from 'react';
import Operate from '../operate'
import { opComponent } from '../operate'
import SelfTable from '../part/table'

console.log('Operate');
console.log(opComponent);

export default class SaLog extends Operate {
    constructor(){
        super();
        this.state = {
            tableData: [],
            api: {
                list: {
                    type: 'get',
                    url: '/log/index'
                }
            }
        }
    }

    async componentDidMount(){
        this.init();
        // var td = await this.tableList(1)
        // this.setState({
        //     tableData: td
        // })
    }

    render(){
        return(
            <SelfTable tableData={this.state.tableData}></SelfTable>
        )
    }
}

// 导出高阶组件生成的组件
export const OpLog = opComponent(SaLog)