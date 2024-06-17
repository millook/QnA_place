import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Nav from './components/Nav';
import Home from './pages/Home';
import Search from './pages/Search'; //추가
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignUpComplete from './pages/SignupComplete';
import ArticleDetail from './pages/ArticleDetail';
import AnswerDetail from './pages/answerDetail';
import AnswerCreate from './pages/answerCreate';
import ArticleComplete from './pages/ArticleComplete';
import ArticleCreate from './pages/ArticleCreate';
import Mypage from './pages/Mypage'; //추가
import './App.css';


function App() {
  return (
    <div className='App'>
    <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signupComplete" element={<SignUpComplete/>} />
          <Route path="/articleCreate" element={<ArticleCreate/>} />
          <Route path="/articleDetail/:id" element={<ArticleDetail/>} />
          <Route path="/answerDetail/:articleId/:answerId" element={<AnswerDetail />} />
          <Route path="/answerCreate/:id" element={<AnswerCreate />} />
          <Route path="/articleComplete" element={<ArticleComplete/>} />
          <Route path="/Mypage" element={<Mypage/>} />
        </Routes>
      </AuthProvider>  
    </div>
  );
}

export default App;
