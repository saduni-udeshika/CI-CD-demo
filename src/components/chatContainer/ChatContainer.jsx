import "./chatContainer.css";
import React, { useState, useEffect, useRef } from "react";
import Logout from "../logout/Logout";
import ChatInput from "../chatInput/ChatInput";
import axios from "axios";
import { getMessagesRoute, sendMessageRoute } from "../../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const getMessages = async () => {
    if (currentChat) {
      const response = await axios.post(getMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
  };

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const sendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      messsage: msg,
    });
    //destrucure messages
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  //run every time when arraiving new message
  useEffect(() => {
    arrivalMessage && setMessages((prve) => [...prve, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <div className="chatBox">
          <div className="chat-header">
            <div className="user-details">
              <div className="user-name">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput sendMessage={sendMessage} />
        </div>
      )}
    </>
  );
}
