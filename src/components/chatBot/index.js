"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { icons } from "../Icons";
import ReactMarkdown from "react-markdown";
import Typed from "typed.js";

export default function ChatWidget() {
  const typedRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [showSmallestTail, setShowSmallestTail] = useState(false);
  const [showMiddleTail, setShowMiddleTail] = useState(false);
  const [showFullCloud, setShowFullCloud] = useState(false);

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

  useEffect(() => {
    const showSequence = () => {
      setShowSmallestTail(true);
      setTimeout(() => setShowMiddleTail(true), 250);
      setTimeout(() => {
        setShowFullCloud(true);

        if (typedRef.current) {
          typedRef.current.innerHTML = "";
          new Typed(typedRef.current, {
            strings: ["May I help you!"],
            typeSpeed: 50,
            showCursor: false,
          });
        }
      }, 500);

      setTimeout(() => {
        setShowSmallestTail(false);
        setShowMiddleTail(false);
        setShowFullCloud(false);
      }, 7000);
    };

    showSequence();

    const interval = setInterval(showSequence, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <img src="bot-head.png" className={styles.botName} />
            <div
              className={styles.closeIcon}
              onClick={() => setIsOpen(!isOpen)}
            >
              {icons["close"]}
            </div>
          </div>
          <div className={styles.messages}>
            <div className={`${styles.message} ${styles.bot}`}>
              <img
                src="bot-head.png"
                className={styles.botIcon}
                style={{ height: "1.2rem" }}
              />
              <div className={styles.messageText}>
                Hi there! 👋 I&apos;m Shanu&apos;s virtual assistant. Feel free
                to ask me about his work experience, education, projects,
                skills, or anything else related to his professional background.
                How can I help you today?
                {/* Hi! I'm Shanu's virtual assistant. How can I
                help you learn more about his professional background today? */}
              </div>
            </div>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${
                  msg.sender === "user" ? styles.user : styles.bot
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src="bot-head.png"
                    className={styles.botIcon}
                    style={{ height: "1.2rem" }}
                  />
                )}
                <div className={styles.messageText}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                {msg.sender === "user" && (
                  <div className={styles.userIcon}>{icons["userProfile"]}</div>
                )}
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
        <>
          <div
            className={`${styles.thinkingCloud} ${
              showFullCloud ? styles.showBounce : ""
            }`}
          >
            <div
              className={`${styles.smallestCloudTail} ${
                showSmallestTail ? styles.show : ""
              }`}
            ></div>
            <div
              className={`${styles.middleCloudTail} ${
                showMiddleTail ? styles.show : ""
              }`}
            ></div>
            <div
              className={`${styles.thinkingCloudShadow} ${
                showFullCloud ? styles.show : ""
              }`}
            ></div>
            <div
              className={`${styles.thinkingCloudText} ${
                showFullCloud ? styles.show : ""
              }`}
            >
              <span ref={typedRef}></span>
            </div>
          </div>
          <button
            className={styles.bubble}
            onClick={() => {
              setIsOpen(!isOpen);
              setShowFullCloud(false);
              setShowMiddleTail(false);
              setShowSmallestTail(false);
            }}
          >
            <img src="/chat-bot.gif" alt="chat-bot" />
          </button>
        </>
      )}
    </div>
  );
}
