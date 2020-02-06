import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './join.css';

const Join = () => {
  const [form, setForm] = useState({
    name: '',
    room: ''
  });

  const changeHandler = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <div>
          <input
            placeholder='Name'
            name='name'
            className='joinInput'
            type='text'
            onChange={changeHandler}
            value={form.name}
          />{' '}
        </div>
        <div>
          <input
            name='room'
            placeholder='Room'
            className='joinInput mt-20'
            type='text'
            onChange={changeHandler}
            value={form.room}
          />{' '}
        </div>
        <Link
          to={`/chat?name=${form.name}&room=${form.room}`}
          onClick={e => (!form.name || !form.room ? e.preventDefault() : null)}
        >
          <button className='button mt-20' type='submit'>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
