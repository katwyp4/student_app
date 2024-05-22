import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, notification, Typography , Tooltip} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { signin } from "../../services/log.service";
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const { Title } = Typography;



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
                zIndex: '1', // Wartość z-index dla tabeli
                position: 'relative'
            }}>
                <img src={"logowikamp.png"} alt="Logo" style={{height: '70px', marginBottom: '20px'}}/>
            </div>
            <div style={{
                width: '275px',
                height: '300px',
                border: '1px solid #ccc',
                backgroundColor: 'white',
                borderRadius: '20px',
                marginTop: '50px',
                padding: '15px',
                margin: '-70px',
                zIndex: '2',// Wartość z-index dla tabeli
                position: 'relative'// Możesz usunąć tę właściwość, jeśli nie ma konfliktów z innymi elementami
            }}>
                <div style={{textAlign: 'center'}}>
                    <Title level={3} style={{color: '#03045E', fontWeight: '300', marginTop: '-4px'}}>Logowanie</Title>
                </div>
                <Form
                    name="login"
                    className="login"
                    requiredMark="optional"
                    onFinish={onFinish}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    {contextHolder}
                    <Form.Item
                        name="username"
                        label={<span style={{color: '#03045E', fontWeight: 'normal', fontSize: '8px',marginTop: '20px'}}>Nazwa użytkownika</span>}
                        labelAlign="left"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: <span style={{fontSize: '10px'}}>Proszę wpisać nazwę użytkownika!</span>
                            },
                        ]}
                        //style={{ marginTop: '20px' }} // Dodajemy odstęp poniżej pola input
                    >
                        <Input
                            bordered={false} // Wyłączamy ramkę
                            style={{ borderBottom: '1px solid #03045E', color: '#03045E', borderRadius:'0', borderBottomWidth: '1px', width: '270px', // Ustawiamy szerokość inputa na 100% rodzica
                                padding: '0',
                                margin: '0',
                                marginTop: '-10px',
                            }} // Dodajemy linie pod polem input
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<span style={{color: '#03045E', fontWeight: 'normal', fontSize: '8px', marginTop: '20px'}}>Hasło</span>}
                        labelAlign="left"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message:  <span style={{ fontSize: '10px' }}>Proszę wpisać hasło!</span>
                            },
                        ]}
                        //style={{ marginBottom: '10px', marginTop: '-70px' }} // Dodajemy odstęp poniżej pola input
                    >
                        <Input.Password
                            bordered={false} // Wyłączamy ramkę
                            style={{ borderBottom: '1px solid #03045E', color: '#03045E', borderRadius:'0', borderBottomWidth: '1px', width: '270px', // Ustawiamy szerokość inputa na 100% rodzica
                                padding: '0',
                                margin: '0',
                                marginTop: '-20px',
                                //marginBottom: '5px'
                            }}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '13dvw', backgroundColor: '#872220', borderRadius: '30px', marginBottom: '-40px'}}>Zaloguj się</Button>
                    </Form.Item>
                    <Form.Item>

                        <Link to="/register" level={1} style={{ color: '#0077B6', fontSize: '10px' }}>Nie masz konta?</Link>

                    </Form.Item>

                </Form>
            </div>
        </div>
    )
        ;
}
