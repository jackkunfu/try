import { Menu, Icon } from 'antd';
import React, { Component } from 'react'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup

export default class NavLeft extends Component {
    constructor(props){
        super(props)
    }

    handleClick(e){
        console.log('click:'+e)
    }

    makeNav(){
        return this.props.navs.map((v, i)=>{
            var sub = v.lists.map((r, j)=>{
                return(<Menu.Item key="{i+'-'+j}">{r.name}</Menu.Item>)
            })
            return(
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>{v.name}</span></span>}>
                    {sub}
                </SubMenu>
            )
        })
    }

    render(){
        console.log(this)
        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: 240 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                {this.makeNav()}
            </Menu>
        )
    }
}
