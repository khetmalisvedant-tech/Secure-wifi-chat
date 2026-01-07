import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

let socket;

function ChatComponent({ user }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket = io('http://localhost:5000');

        socket.emit('join', { id: user.id, name: user.name, role: user.role });

        socket.on('receiveMessage', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (text.trim()) {
            socket.emit('sendMessage', text);
            setText('');
        }
    };

    const saveMessage = async (msg) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/chat/save', {
                senderId: msg.sender.id,
                senderName: msg.sender.realName,
                text: msg.text,
                originalTimestamp: msg.timestamp
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Message saved!');
        } catch (err) {
            console.error('Error saving message:', err);
            alert('Failed to save message.');
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px', borderRadius: '5px' }}>
            <h3>💬 Live Chat (Ephemeral)</h3>
            <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #eee', marginBottom: '10px', padding: '5px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '5px' }}>
                        <strong>
                            {user.role === 'operator' ? `${msg.sender.realName} (${msg.sender.displayName})` : msg.sender.displayName}:
                        </strong> {msg.text}
                        {user.role === 'operator' && (
                            <button
                                onClick={() => saveMessage(msg)}
                                style={{ marginLeft: '10px', fontSize: '0.8em', cursor: 'pointer' }}
                            >
                                💾 Save
                            </button>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    style={{ flex: 1, padding: '5px' }}
                />
                <button type="submit" style={{ padding: '5px 10px' }}>Send</button>
            </form>
        </div>
    );
}

export default ChatComponent;
