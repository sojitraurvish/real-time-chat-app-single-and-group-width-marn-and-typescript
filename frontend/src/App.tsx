import React, { useEffect } from 'react';
import './App.css';
import {Route,Routes, useNavigate} from "react-router-dom"
import Home from './pages/Home';
import Chat from './pages/Chat';
import styled from "styled-components"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { createAction } from './utils/reducer.utils';
import { createSocket } from './store/actions/socketActions';

const App=()=>{

  const dispatch=useDispatch<AppDispatch>();

  useEffect(()=>{
    const socket=io()
    // const socket=io();
        // socket=io(/*here you can provide endpoint but here we have already added proxy in package.json *http://localhost:5000... */)
  
    dispatch(createSocket(socket))

    return ()=>{
      console.log("SOkkcet CLose")
      socket.close(); 
    }
  })

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

