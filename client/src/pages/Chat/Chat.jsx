import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Input, Space, notification, Card, Avatar } from 'antd';
import { fetchPost, addPost } from '../../services/chat.service';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

const { Meta } = Card;

export default function Chat() {
    const [avatars, setAvatars] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [api, contextHolder] = notification.useNotification();
    const currentUser = 'currentUser'; // Replace with actual current user logic
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [posts]);

    const notify = useCallback((type, title, description) => {
        api[type]({
            message: title,
            description: description,
            placement: 'topRight',
        });
    }, [api]);

    React.useEffect(() => {
        const init = async () => {
            try {
                const data = await fetchPost();
                setPosts(data);
            } catch (error) {
                notify('error', 'Przykro nam :(', `Pobieranie wiadomości nie powiodło się: ${error.message}`);
            }
        };

        init();
    }, [setPosts, notify]);

    React.useEffect(() => {
        const newAvatars = posts.reduce((acc, post, index) => {
            if (!avatars.find(avatar => avatar.author === post.author)) {
                acc.push({ author: post.author, src: `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}` });
            }
            return acc;
        }, []);

        if (newAvatars.length > 0) {
            setAvatars(prevAvatars => [...prevAvatars, ...newAvatars]);
        }
    }, [posts, avatars]);

    const sendMessage = async () => {
        try {
            if (!message) { throw new Error('Brakuje wiadomości.'); }
            await addPost(message);
            const data = await fetchPost();
            setPosts(data);
            setMessage(''); // Clear the message input
        } catch (error) {
            notify('error', 'Przykro nam :(', `Wysyłanie wiadomości nie powiodło się: ${error.message}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const goToMenu = () => {
        navigate('/menu');
    };

    document.body.style.backgroundColor = "#D3D3D3";

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{
                maxWidth: '100%',
                backgroundColor: '#872220',
                height: '110px',
                padding: '20px',
                textAlign: 'center',
                borderBottomLeftRadius: '50px',
                borderBottomRightRadius: '50px',
                zIndex: '1',
                position: 'relative'
            }}>
                <div className="back-button" onClick={goToMenu} style={{ position: 'absolute', top: 20, left: 20, cursor: 'pointer', fontSize: 24, color: '#FFFFFF' }}>
                    <BiArrowBack/>
                </div>
                <h1 style={{margin: 0, color: 'white', fontSize: '29px', marginTop: '20px', fontWeight: 'normal'}}>Chat grupowy</h1>
                <h1 style={{margin: 0, color: 'white', fontSize: '17px', marginTop: '30px', fontWeight: 'normal'}}>Politechnika Łódzka</h1>
            </div>
            <div style={{ flex: 1, overflowY: "auto", display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
                <Space direction="vertical" style={{ padding: 20, width: '100%', alignItems: 'center' }}>
                    {contextHolder}
                    {posts.map((post, index) => {
                        const avatar = avatars.find(avatar => avatar.author === post.author);
                        const src = avatar ? avatar.src : `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`;
                        const isCurrentUser = post.author === currentUser;

                        return (
                            <div key={index} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <Card
                                    style={{ width: 500, marginTop: 16 }}
                                    actions={[post.timestamp]}
                                >
                                    <Meta
                                        avatar={<Avatar src={src} />}
                                        title={post.author}
                                        description={post.message}
                                    />
                                </Card>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </Space>
            </div>
            <div style={{ padding: 20 }}>
                <Space direction="horizontal" style={{ width: '100%', justifyContent: "center" }}>
                    <Input
                        placeholder='Message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress} // Handle key press
                        style={{ width: 300 }}
                    />
                    <Button style={{ width: 70 }} onClick={sendMessage}>Send</Button>
                </Space>
            </div>
        </div>
    );
}
