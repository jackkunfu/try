import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import Utils from './utils'
const FormItem = Form.Item;

export default class Login extends Utils {
    constructor(){
        super();
    }

    getInitialState(){
        return {
            mobile: '',
            password: ''
        }
    }

    async handleSubmit(){
        var req = await this.ajax('get', '/login', {
            mobile: this.mobile,
            password: this.password
        })
        if(req){
            if(req.success){
                window.location = '/';
            }
        }
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <Form layout="inline">
                    <FormItem>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="text" placeholder="用户名" />
                    </FormItem>
                    <FormItem>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSubmit}> Log in </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
