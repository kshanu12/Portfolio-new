'use client';
import { useState } from 'react';
import styles from './styles.module.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    const botMessage = { sender: 'bot', text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${
                  msg.sender === 'user' ? styles.user : styles.bot
                }`}
              >
                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      <button className={styles.bubble} onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>
    </div>
  );
}
