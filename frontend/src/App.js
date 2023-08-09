import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [message, setMessage] = useState('Non');
  const [state, setState] = useState(false);
  const [buttonClass, setButtonClass] = useState('on-button');  // off-button
  let socketRef = useRef(null);
  useEffect(() => {
    // Create a new WebSocket instance
    // eslint-disable-next-line 
    socketRef.current = new WebSocket('ws://localhost:8080');

    // Connection opened
    socketRef.current.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
    });

     // Listen for messages
     socketRef.current.addEventListener('message', (event) => {
      var data = JSON.parse(event.data);
      if (data.op === '10') {
        setMessage(data.state ? 'On' : 'Off');
        setState(data.state);
      }
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const ButClick = () => {
    setState(!state);
    socketRef.current.send(JSON.stringify({ op: '1', data: { state: state } }));
    setMessage(!state ? 'On' : 'Off');
    setButtonClass(state ? 'on-button' : 'off-button');
  }
  return (
    <>
    <div>
      <div class="center-container">
          <button onClick={()=> ButClick()} className={"centered-button "+{buttonClass}}>
              <span>{message}</span>
          </button>
      </div>
    </div>
    </>
  )
}

export default App;
