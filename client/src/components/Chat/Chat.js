import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './chat.css';

const Chat = ({ location }) => {
  const [chatData, setChatData] = useState({
    name: '',
    room: ''
  });
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    // retrieve data from query
    const data = queryString.parse(location.search);
    // spread onto useState
    setChatData({
      ...data
    });

    // initialize socket
    let socket = io(ENDPOINT);
    socket.emit('join', { ...chatData });

  }, [ENDPOINT, location.search]);

  return <div>CHAT</div>;
};

export default Chat;
