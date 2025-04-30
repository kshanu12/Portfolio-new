'use client';
import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { icons } from "../Icons";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    const botMessage = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
            <img src="bot-head.png" className={styles.botName} />
            <div className={styles.closeIcon}>{icons["close"]}</div>
          </div>
          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${
                  msg.sender === "user" ? styles.user : styles.bot
                }`}
              >
                  {msg.sender === "user" ? (
                    <div className={styles.userIcon}>{icons["userProfile"]} </div>
                  ) : (
                    <img
                      src="bot-head.png"
                      style={{ height: "1rem", marginTop: "5px" }}
                    />
                  )}
                <div className="messageText">
                &nbsp; : {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Enter your message..."
            />
            <button onClick={toggleListening} style={{ marginLeft: "0rem" }}>
              {isListening ? icons["enabledMic"] : icons["disabledMic"]}
            </button>
            <button onClick={sendMessage}>{icons["send"]}</button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button className={styles.bubble} onClick={() => setIsOpen(!isOpen)}>
          <img src="/chat-bot.gif" alt="chat-bot" />
        </button>
      )}
    </div>
  );
}
