import React, { useState } from 'react';

export default function MainComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const handleSendMessage = () => {
    if (!newMessage || !username) {
      setError('Please enter a message and username');
      return;
    }
    setMessages([...messages, { message: newMessage, username: username }]);
    setNewMessage('');
    setError(null);
  };

  const handleDeleteMessage = (index) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  const handleUpdateMessage = (index, newMessage) => {
    const newMessages = [...messages];
    newMessages[index].message = newMessage;
    setMessages(newMessages);
  };

  return (
    <div style={{ background: '#080c14', padding: '24px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '600' }}>Chat App</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginRight: '12px' }}>{messages.length} messages</p>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginRight: '12px' }}>{messages.filter((message) => message.username === username).length} messages from you</p>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginRight: '12px' }}>{new Date().toLocaleTimeString()}</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>{new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {messages.length === 0 ? (
          <div style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No messages yet!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} style={{ background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
              <p style={{ color: '#f1f5f9', fontSize: '14px', fontWeight: '600' }}>{message.username}:</p>
              <p style={{ color: '#f1f5f9', fontSize: '14px' }}>{message.message}</p>
              {username === message.username && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <input
                    type="text"
                    value={message.message}
                    onChange={(e) => handleUpdateMessage(index, e.target.value)}
                    style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%' }}
                  />
                  <button
                    onClick={() => handleDeleteMessage(index)}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '20%' }}
        />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message"
          style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '60%' }}
        />
        <button
          onClick={handleSendMessage}
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
      {error && <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '12px' }}>{error}</p>}
    </div>
  );
}