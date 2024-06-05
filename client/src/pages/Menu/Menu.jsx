import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Typography } from "antd";
import { AiOutlineLogout } from "react-icons/ai"; // Importujemy ikonę wylogowania

const { Title } = Typography;

export default function Menu() {
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
                <Link to="/"> {/* Przekierowanie do strony wylogowania */}
                    <AiOutlineLogout style={{ position: 'absolute', top: '20px', left: '35px', fontSize: '24px', color: 'white', cursor: 'pointer' }} />
                </Link>
                <img src={"logowikamp.png"} alt="Logo" style={{ height: '70px', marginBottom: '20px' }} />
            </div>
            <div style={{
                width: '275px',
                height: '300px',
                border: '1px solid #ccc',
                backgroundColor: 'white',
                borderRadius: '20px',
                marginTop: '50px',
                padding: '30px',
                margin: '-70px',
                zIndex: '2',
                position: 'relative'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={3} style={{ color: '#03045E', fontWeight: '300', marginTop: '-4px' }}>Menu</Title>
                </div>

                <Form>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/schedule">
                            <Button type="primary" style={{ width: '13dvw', backgroundColor: '#872220', borderRadius: '30px', marginTop: '20px' }}>
                                Plan zajęć
                            </Button>
                        </Link>
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/calendar">
                            <Button type="primary" style={{ width: '13dvw', backgroundColor: '#872220', borderRadius: '30px', marginTop: '6px' }}>
                                Kalendarz
                            </Button>
                        </Link>
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/chat">
                            <Button type="primary" style={{ width: '13dvw', backgroundColor: '#872220', borderRadius: '30px', marginTop: '6px' }}>
                                Chat
                            </Button>
                        </Link>
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <a href="https://nav.p.lodz.pl/?building=a22" target="_blank" rel="noopener noreferrer">
                            <Button type="primary" style={{ width: '13dvw', backgroundColor: '#872220', borderRadius: '30px', marginTop: '6px' }}>
                                Mapa PŁ
                            </Button>
                        </a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
