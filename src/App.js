import './App.css';
import React from 'react';
import Login from './Login';
import Main from './main';
import {Route, Routes} from 'react-router-dom';

function App() {


  return (
    <div id='wrapper'>
      <Routes>
        <Route path='/' element={<Login />} /> 
        <Route path='/main' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
