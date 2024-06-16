import React, { useState, useEffect } from "react";
import "./Nav.css";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // useAuth를 사용합니다.

export default function Nav() {
  const [show, setShow] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // 로그인 상태와 로그아웃 함수를 가져옵니다.
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleCreateClick = () => {
    if (isLoggedIn) {
      navigate('/articleCreate');
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // 로그아웃 후 홈으로 이동
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav__logo">
        <img src="/qnaplace_logo.png" alt="Logo" />
      </Link>
      <div className="nav-buttons">
      <button onClick={handleCreateClick} className="nav-create-button">질문 생성하기</button>
        {isLoggedIn ? (
          <>
            <Link to="/mypage" className="nav-login-button">마이페이지</Link>
            <button onClick={handleLogout} className="nav-signup-button">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-login-button">로그인</Link>
            <Link to="/signup" className="nav-signup-button">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
}
