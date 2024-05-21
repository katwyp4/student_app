import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { signup } from "../../services/register.service";

export default function Register(){
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
            if(!values.name || !values.surname || !values.email || !values.password){ 
                throw new Error('Brakuje danych.'); 
            }
            const result = await signup(values.name, values.surname, values.email, values.password);
            notify('success', 'Sukces!', 'Rejestracja przebiegła pomyślnie.'); 
        }catch(error){
            notify('error', 'Przykro nam :(', `Rejestracja nie powiodła się: ${error.message}`);
        }
    };

    return(
        <Form name="register" className="register" onFinish={onFinish} style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {contextHolder}
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Name!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="surname"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Surname!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder="Surname" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: 'Please input a valid Email!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email" />
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
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button" style={{ width: '13vw' }}>Register</Button>
            </Form.Item>
        </Form>
    );
}
