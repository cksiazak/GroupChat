import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './chat.css';

const Chat = ({ location }) => {
  const [uriData, setUriData] = useState({
    name: '',
    room: ''
  });
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    // retrieve data from query
    const { name, room } = queryString.parse(location.search);
    // initialize socket
    let socket = io(ENDPOINT);

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

  return <div>CHAT</div>;
};

export default Chat;
