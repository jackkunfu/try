import React from 'react';
import Utils from './utils'

import NavLeft from './part/navLeft'

class Saas extends Utils {
    constructor(props){
        super(props);
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
        this.props.hy.push('/'+v)
    }

    async componentDidMount(){
        var navs = await this.getNavs();
        if(navs && navs.length>0){
            this.setState({
                navs: await this.getNavs()
            })
            this.refs.op.setState({
                navs: await this.getNavs()
            })
        }
    }

    render(){
        return (
            <div className="main" style={{position:'relative'}}>
                <div className="ml" style={{position:'absolute'}}>
                    <NavLeft navs={this.state.navs} onJump={this.onJump.bind(this)} ref="op"></NavLeft>
                </div>
                
                <div className="mr" style={{margin:'0 10px 0 250px'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Saas
