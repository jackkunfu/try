import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import Utils from './utils'
const FormItem = Form.Item;

export default class Login extends Utils {
    constructor(){
        super();
        this.state = {
            mobile: '',
            password: ''
        }
    }

    getInitialState(){
        return {
            mobile: '',
            password: ''
        }
    }

    async handleSubmit(){
        var req = await this.ajax('get', '/login', {
            mobile: this.refs.mobile.refs.input.value,
            password: this.refs.password.refs.input.value
        })
        if(req){
            if(req.success){
                this.props.history.push('/')
            }
        }
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <Form layout="inline">
                    <FormItem>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="text" placeholder="用户名" ref="mobile"/>
                    </FormItem>
                    <FormItem>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" ref="password"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}> Log in </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
