import React from 'react';
import { Button, Input, Space, notification, Card, Avatar, Skeleton, Switch } from 'antd';

const { Meta } = Card;

export default function Chat() {
    const [posts, setPosts] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = React.useState(true);

    const notify = (type, title, description) => {
        api[type]({
            message: title,
            description: description,
            placement: 'topRight',
        });
    };

    const sendMessage = async () => {
        try {
            if (!message) { throw new Error('Brakuje wiadomości.'); }
            if (!author) { throw new Error('Brakuje autora.'); }
            const timestamp = new Date().toLocaleString();
            const newPost = { message, author, timestamp };
            notify('success', 'Wysłano!', message);
            setPosts([...posts, newPost]);  
            setMessage('');
            setAuthor('');
        } catch (error) {
            notify('error', 'Przykro nam :(', `Wysyłanie wiadomości nie powiodło się: ${error.message}`);
        }
    };

    const onChange = (checked) => {
        setLoading(!checked);
    };

    return (
        <Space direction="vertical" style={{ width: '100vw', height: '100vh', display: "flex", alignItems: "center", padding: 20 }}>
            {contextHolder}
            <Switch checked={!loading} onChange={onChange} />
            {posts.map((post, index) => (
                <Card
                    key={index}
                    style={{ width: 300, marginTop: 16 }}
                    actions={[
                        post.timestamp
                        // <EditOutlined key="edit" />,
                        // <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Skeleton loading={loading} avatar active>
                        <Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index + 1}`} />}
                            title={`${post.author} `}
                            description={post.message}
                        />
                    </Skeleton>
                </Card>
            ))}
            <Space direction="horizontal" style={{ width: '100%', justifyContent: "center" }}>
                <Input placeholder='Author' value={author} onChange={(e) => setAuthor(e.target.value)} style={{ width: 200 }} />
                <Input placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: 300 }} />
                <Button style={{ width: 70 }} onClick={sendMessage}>Send</Button>
            </Space>
        </Space>
    );
}
