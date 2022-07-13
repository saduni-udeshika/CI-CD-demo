import "./chat.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoute, baseURL } from "../../utils/APIRoutes";
import Contacts from "../../components/chatContacts/Contacts";
import Welcome from "../../components/welcomeChat/Welcome";
import ChatContainer from "../../components/chatContainer/ChatContainer";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoad, setIsLoad] = useState(false);

  const setUser = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoad(true);
    }
  };

  useEffect(() => {
    if (currentUser) {
      //stablish connection
      socket.current = io(baseURL);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const getAllUsers = async () => {
    if (currentUser) {
      const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
      setContacts(data.data);
    }
  };

  useEffect(() => {
    setUser();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [currentUser]);

  //handle chat change
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat-container">
      <div className="chat">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoad && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}
