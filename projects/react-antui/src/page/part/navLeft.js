import { Menu, Icon } from 'antd';
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup

export default class NavLeft extends Component {
    // constructor(props){
    //     super(props)
    // }

    handleClick(e){
        this.props.onJump(e.key)
    }

    makeNav(){
        return this.props.navs.map((v, i)=>{
            if(!v.lists || v.lists.length===0){
                return(
                    // <Link to={v.linkUrl} key={i}>
                        <Menu.Item key={v.linkUrl}><Icon type="pie-chart" /><span>{v.permissionName}</span></Menu.Item>
                    // </Link>
                )
            }
            var sub = v.lists.map((r, j)=>{
                return(
                    // <Link to={r.linkUrl} key={i}>
                        <Menu.Item key={r.linkUrl}>{r.permissionName}</Menu.Item>
                    // </Link>
                )
            })
            return(
                <SubMenu key={i} title={<span><Icon type="mail" /><span>{v.permissionName}</span></span>}>
                    {sub}
                </SubMenu>
            )
        })
    }

    render(){
        return (
            <Menu
                onClick={this.handleClick.bind(this)}
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
