import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { signin } from "../../services/log.service";

export default function Log(){
    const navigate = useNavigate(); // do przekierowania.
    const [api, contextHolder] = notification.useNotification();
    const notify = (type, title, message) => {
      api[type]({
        message: title,
        description: message
      });
    };

    const onFinish = async (values) => {
        try{
            if(!values.username && !values.password){ throw new Error('Brakuje danych.'); }
            const result = await signin(values.username, values.password);
            if(result){ notify('success', 'Sukces!', `Operacja logowania przebiegła pomyślnie.`); }
            else { throw new Error('Logowanie się nie powiodło spróbuj ponownie.'); }
        }catch(error){
            notify('error', 'Przykro nam :(', `Operacja logowania nie przebiegła pomyślnie: ${error}`);
        }
    };

    return(
        <Form name="login" className="login" onFinish={onFinish} style={{width: '100dvw', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
             {contextHolder}
             <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '13dvw'}}>Log in</Button>
                {/* Or <a href="/register">register now!</a> */}
            </Form.Item>
        </Form>
    );
}