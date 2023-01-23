import React, { useEffect } from 'react';
import './App.css';
import {Route,Routes, useNavigate} from "react-router-dom"
import Home from './pages/Home';
import Chat from './pages/Chat';
import styled from "styled-components"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';

const App=()=>{

  return (
    <div className='App'>
        <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route path='/chats' element={<Chat/>}/>
        </Routes>
        <ToastContainer theme="colored"/>
    </div>
  );
}

export default App;

