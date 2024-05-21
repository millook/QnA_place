//탑네비게이션 (사진 넣기)
import React, { useState, useEffect } from "react";
import "./Nav.css";
import { Link } from 'react-router-dom';


export default function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("window.scrollY", window.scrollY);
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

  return (
    <nav className="nav">
      <Link to="/" className="nav__logo">
        <img src="/qnaplace_logo.png" alt="Logo" />
      </Link>
      <div className="nav-buttons">
        <Link to="/login" className="nav-login-button">로그인</Link>
        <Link to="/signup" className="nav-signup-button">회원가입</Link>
      </div>
    </nav>
  );
}



