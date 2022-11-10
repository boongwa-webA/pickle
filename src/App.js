import './App.css';
import React from 'react';
import Login from './Login';
import Main from './main';
import { Route, Routes} from 'react-router-dom';
import Register from './Register';

function App() {


  return (
    <div id='wrapper'>
      <Routes>
        <Route path='/login' element={<Login />} /> 
        <Route path='/register' element={<Register />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
