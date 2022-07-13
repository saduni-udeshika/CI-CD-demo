import React from 'react';
import './welcome.css';
import Chatbot from '../../asserts/Chatbot.gif';

export default function Welcome({currentUser}) {
  return (
    <div className='inbox-container'>
          <img className="chatgif" src={Chatbot} alt="Chatbot" style={{ width: "10rem", height: "10rem"}}/>
           <span className="chatspan">{currentUser.username}.</span>
          <h3>Select a chat to start messaging.</h3>
    </div>
  )
}
