import React, { useCallback } from 'react';
import { Button, Input, Space, notification, Card, Avatar, Skeleton, Switch } from 'antd';
import { fetchPost, addPost } from '../../services/chat.service';

const { Meta } = Card;

export default function Chat() {
    const [avatars, setAvatars] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [api, contextHolder] = notification.useNotification();

    const notify = useCallback((type, title, description) => {
        api[type]({
            message: title,
            description: description,
            placement: 'topRight',
        });
    }, [api]);

    React.useEffect(() => {
        const init = async () => {
            try{
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
            const response = await addPost(message);
            const data = await fetchPost();
            setPosts(data);
        } catch (error) {
            notify('error', 'Przykro nam :(', `Wysyłanie wiadomości nie powiodło się: ${error.message}`);
        }
    };

    return (
        <Space direction="vertical" style={{ width: '100vw', height: '100vh', display: "flex", alignItems: "center", padding: 20 }}>
            {contextHolder}
            {posts.map((post, index) => {
                const avatar = avatars.find(avatar => avatar.author === post.author);
                const src = avatar ? avatar.src : `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`;

                return (
                    <Card
                        key={index}
                        style={{ width: 300, marginTop: 16 }}
                        actions={[post.timestamp]}
                    >
                        <Meta
                            avatar={<Avatar src={src} />}
                            title={post.author}
                            description={post.message}
                        />
                    </Card>
                );
            })}
            <Space direction="horizontal" style={{ width: '100%', justifyContent: "center" }}>
                <Input placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: 300 }} />
                <Button style={{ width: 70 }} onClick={sendMessage}>Send</Button>
            </Space>
        </Space>
    );
}
