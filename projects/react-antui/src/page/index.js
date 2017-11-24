
import React from 'react';
// import { Link } from 'react-router-dom'
import NavLeft from './part/navLeft'

import Utils from './utils'

class Index extends Utils {
    constructor(){
        super();
        this.state = {
            navs: []
        }
    }

    async getNavs(){
        var req = await this.ajax('get', '/permission/homeList')
        if(req){
            var level1 = req.model.topList
            var data = await Promise.all(
                level1.map(async (v) => {
                    if(v.linkUrl){
                        v.lists = [];
                        return v;
                    }
                    var l2 = await this.ajax('post', '/permission/itemList', {parentId: v.id})
                    if(l2) v.lists = l2.model || [];
                    return v
                })
            )
            return data
        }else{
            return []
        }
    }

    onJump(v){
        this.props.history.push('/'+v)
    }

    async componentDidMount(){
        this.setState({
            navs: await this.getNavs()
        })
    }

    render(){
        return (
            <div>
                {/* <h1>Index</h1> */}
                <NavLeft navs={this.state.navs} onJump={this.onJump.bind(this)}></NavLeft>
                {this.props.children}
            </div>
        )
    }
}

export default Index
