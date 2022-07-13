import "./chatInput.css";
import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ sendMessage }) {
  const [showEmojiPker, setShowEmojiPiker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleShowPiker = () => {
    setShowEmojiPiker(!showEmojiPker);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      sendMessage(msg);
      setMsg("");
    }
  };
  return (
    <div className="input-container">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleShowPiker} />
          {showEmojiPker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          className="message-input"
          type="text"
          placeholder="Type your message...."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit-msg">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
