import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'
import './login.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const raw = JSON.stringify({
            name: username,
            password: password
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        try {
            const response = await fetch('/member/login', requestOptions);
            if (response.ok) {
                login();
                navigate('/');
                //console.log('Username:', username);
                //console.log('Password:', password);  
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                alert('아이디 및 비밀번호가 잘못되었습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in: ' + error.message);
        }
    };

    

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>로그인</h2>
                <div className="form-group">
                    <label htmlFor="username">아이디</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="아이디를 입력하세요"
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="비밀번호를 입력하세요"
                        required 
                    />
                </div>
                <button type="submit">로그인</button>
                <div className="forgot-links">
                    <Link to="/find-username">아이디 찾기</Link> | <Link to="/find-password">비밀번호 찾기</Link>
                </div>
                <div className="signup-info">
                    <p>Q&A Place가 처음이신가요? <Link to="/signup">회원가입</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;

