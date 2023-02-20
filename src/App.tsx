import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

import Chat from './components/Chat';
import ChatList from './components/ChatList';

function App() {
  console.log(process.env.REACT_APP_API_KEY)
  useEffect(() => {
    axios.get('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
      }
    })
    .then((res) => console.log(res.data.data))
  }, [])

  return (
    <>
    <ChatList>
      <Chat />
    </ChatList>
    </>
  );
}

export default App;
