import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './mypage.css';

const MyPage = () => {
    const { userId } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const memberId = userId;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const raw = JSON.stringify({
            memberId: memberId,
            name: username,
            email: email,
        });

        console.log('Request Body:', raw);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
        };

        try {
            const response = await fetch('/member', requestOptions);
            if (response.ok) {
                const result = await response.json();
                console.log('Response:', result);
                setMessage('정보가 성공적으로 수정되었습니다.');
            } else {
                const errorData = await response.json();
                console.error('Error Data:', errorData);
                setMessage(`사용할 수 없는 아이디입니다.`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(`${error.message}`);
        }
    };

    return (
        <div className="mypage-container">
            <div className="mypage-sidebar">
                <h2>마이페이지</h2>
                <ul>
                    <li>계정정보 수정</li>
                </ul>
            </div>
            <div className="mypage-content">
                <h2>계정정보 수정</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">아이디</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">수정</button>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default MyPage;
