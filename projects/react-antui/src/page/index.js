
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
        // console.log(req);
        // return req ? req.model.leftList : [];
        if(req){
            var level1 = req.model.topList
            var data = await Promise.all(
                level1.map(async (v) => {
                    if(v.linkUrl){
                        v.lists = [];
                        console.log(v.linkUrl)
                        return v;
                    }
                    var l2 = await this.ajax('post', '/permission/itemList', {parentId: v.id})
                    if(l2) v.lists = l2.model || [];
                    return v
                })
            )
            console.log('alldata')
            console.log(data)
            return data
        }else{
            return []
        }

    }

    async componentDidMount(){
        this.setState({
            navs: await this.getNavs()
        })
        // this.state.navs = await this.getNavs();
    }

    render(){
        return (
            <div>
                <h1>Index</h1>
                <NavLeft navs={this.state.navs}></NavLeft>
            </div>
        )
    }
}

export default Index
