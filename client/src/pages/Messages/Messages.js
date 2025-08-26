import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Messages.css';

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Mock messages data - replace with actual API call
    const mockMessages = [
      {
        id: 1,
        sender: {
          id: 2,
          name: 'John Doe',
          avatar: 'https://via.placeholder.com/40'
        },
        lastMessage: 'Hi, I am interested in this opportunity...',
        timestamp: new Date(Date.now() - 3600000),
        unread: 2
      },
      {
        id: 2,
        sender: {
          id: 3,
          name: 'Jane Smith',
          avatar: 'https://via.placeholder.com/40'
        },
        lastMessage: 'Thank you for your application!',
        timestamp: new Date(Date.now() - 7200000),
        unread: 0
      }
    ];
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="messages">
      <div className="messages-header">
        <h1>Messages</h1>
      </div>

      <div className="messages-container">
        <div className="conversations-list">
          <h2>Conversations</h2>
          {messages.map(message => (
            <div
              key={message.id}
              className={`conversation-item ${selectedConversation?.id === message.id ? 'active' : ''}`}
              onClick={() => setSelectedConversation(message)}
            >
              <img src={message.sender.avatar} alt={message.sender.name} className="avatar" />
              <div className="conversation-info">
                <h3>{message.sender.name}</h3>
                <p>{message.lastMessage}</p>
                <span className="timestamp">{formatTime(message.timestamp)}</span>
                {message.unread > 0 && (
                  <span className="unread-badge">{message.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="message-chat">
          {selectedConversation ? (
            <div className="chat-container">
              <div className="chat-header">
                <img src={selectedConversation.sender.avatar} alt={selectedConversation.sender.name} />
                <h3>{selectedConversation.sender.name}</h3>
              </div>
              <div className="chat-messages">
                <div className="message received">
                  <p>{selectedConversation.lastMessage}</p>
                  <span className="message-time">{formatTime(selectedConversation.timestamp)}</span>
                </div>
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          ) : (
            <div className="no-conversation">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
