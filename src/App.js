import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ArticleDetail from './pages/ArticleDetail';
import ArticleComplete from './pages/ArticleComplete';
import ArticleCreate from './pages/ArticleCreate';
import './App.css';


function App() {
  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/articleCreate" element={<ArticleCreate/>} />
        <Route path="/articleDetail/:id" element={<ArticleDetail/>} />
        <Route path="/articleComplete" element={<ArticleComplete/>} />
      </Routes>
    </div>
  );
}

export default App;