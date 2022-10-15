import './App.css';
import {fireStore} from './Firebase';
import {useEffect} from 'react';
import React from 'react';

function App() {
  useEffect(() => {
    console.log(fireStore)
  });

  return (
    <div className="App">
      hello world
    </div>
  );
}

export default App;
