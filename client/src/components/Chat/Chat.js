import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/Infobar';

import './chat.css';

// keep socket outside of component so it doesn't clear
// upon re-renders
let socket;

const Chat = ({ location }) => {
  const [uriData, setUriData] = useState({
    name: '',
    room: ''
  });
  // this is the individual message
  const [message, setMessage] = useState('');
  // contains all messages
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    // retrieve data from query
    const { name, room } = queryString.parse(location.search);
    // initialize socket
    socket = io(ENDPOINT);

    // spread onto useState
    setUriData({ room, name });

    // emit data pulled from queryString
    socket.emit('join', { name, room }, () => {});

    return () => {
      // cleanup function, emitting disconnect event
      socket.emit('disconnect');
      // turn off this instance
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // handles messages
  useEffect(() => {
    // socket listens for messages
    socket.on('message', message => {
      // spreading our current messages, and adding our message
      setMessages([...messages, message]);
    });
    // update everytime message changes
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();

    // if there is a message in our state
    // once we send it
    if (message) {
      // we'll emit a sendMessage param
      // pass in our message
      // and use our calback to set our message to an empty string
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={uriData.room} />
        {/* <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => (e.key === 'Enter' ? sendMessage(e) : null)}
        /> */}
      </div>
    </div>
  );
};

export default Chat;
