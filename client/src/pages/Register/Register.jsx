import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification, Typography } from "antd";
import { signup } from "../../services/register.service";

const { Title } = Typography;

export default function Register() {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const notify = (type, title, message) => {
        api[type]({
            message: title,
            description: message
        });
    };

    const onFinish = async (values) => {
        try {
            if (!values.name || !values.surname || !values.email || !values.password) {
                throw new Error('Brakuje danych.');
            }
            const result = await signup(values.name, values.surname, values.email, values.password);
            notify('success', 'Sukces!', 'Rejestracja przebiegła pomyślnie.');
        } catch (error) {
            notify('error', 'Przykro nam :(', `Rejestracja nie powiodła się: ${error.message}`);
        }
    };

    return (
        <div style={{
            width: '100dvw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowX: 'hidden',
            overflowY: 'hidden',
            backgroundColor: '#D3D3D3'
        }}>
            <div style={{
                width: '100%',
                backgroundColor: '#872220',
                height: '150px',
                padding: '20px',
                textAlign: 'center',
                borderBottomLeftRadius: '50px',
                borderBottomRightRadius: '50px',
                zIndex: '1',
                position: 'relative'
            }}>
                <img src={"logowikamp.png"} alt="Logo" style={{ height: '70px', marginBottom: '20px' }} />
            </div>
            <div style={{
                width: '275px',
                height: '300px',
                border: '1px solid #ccc',
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '30px',
                margin: '-70px',
                zIndex: '2',
                position: 'relative'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={3} style={{ color: '#03045E', fontWeight: '300', marginTop: '-10px', marginBottom: '3px' }}>Rejestracja</Title>
                </div>
                <Form name="register" className="register" onFinish={onFinish} requiredMark="optional" style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    {contextHolder}
                    <Form.Item
                        name="name"
                        labelAlign="left"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: <span style={{ fontSize: '10px' }}>Proszę wpisać imię!</span>
                            },
                        ]}
                        style={{ marginBottom: '15px' }}
                    >
                        <Input
                            placeholder="Imię"
                            bordered={false}
                            style={{
                                borderBottom: '1px solid #03045E',
                                color: '#03045E',
                                borderRadius: '0',
                                borderBottomWidth: '1px',
                                width: '270px',
                                padding: '0px',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="surname"
                        labelAlign="left"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: <span style={{ fontSize: '10px' }}>Proszę wpisać nazwisko!</span>
                            },
                        ]}
                        style={{ marginBottom: '15px' }}
                    >
                        <Input
                            placeholder="Nazwisko"
                            bordered={false}
                            style={{
                                borderBottom: '1px solid #03045E',
                                color: '#03045E',
                                borderRadius: '0',
                                borderBottomWidth: '1px',
                                width: '270px',
                                padding: '0px',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        labelAlign="left"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: <span style={{ fontSize: '10px' }}>Proszę wpisać e-mail!</span>
                            },
                        ]}
                        style={{ marginBottom: '15px' }}
                    >
                        <Input
                            placeholder="E-mail"
                            bordered={false}
                            style={{
                                borderBottom: '1px solid #03045E',
                                color: '#03045E',
                                borderRadius: '0',
                                borderBottomWidth: '1px',
                                width: '270px',
                                padding: '0px',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        labelAlign="left"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: <span style={{ fontSize: '10px' }}>Proszę wpisać hasło!</span>
                            },
                        ]}
                        style={{ marginBottom: '30px' }}
                    >
                        <Input
                            type="password"
                            placeholder="Hasło"
                            bordered={false}
                            style={{
                                borderBottom: '1px solid #03045E',
                                color: '#03045E',
                                borderRadius: '0',
                                borderBottomWidth: '1px',
                                width: '270px',
                                padding: '0px',
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '13dvw', backgroundColor: '#872220', borderRadius: '30px', marginBottom: '-40px'}}>Zarejestruj się</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
