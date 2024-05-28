import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleTermsAgreementChange = () => {
        setTermsAgreed(!termsAgreed);
    };

    const handlePrivacyPolicyAgreementChange = () => {
        setPrivacyPolicyAgreed(!privacyPolicyAgreed);
    };
    
    const handleSignUp = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        const raw = JSON.stringify({
            name: username,
            email: email,
            password: password
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        try {
            const response = await fetch('/member/join', requestOptions);
            if (response.ok) {
                navigate('/signup-complete');
            } else {
                const errorData = await response.json();
                console.error('Sign up failed:', errorData);
                alert('Sign up failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up: ' + error.message);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignUp}>
                <h2>회원가입</h2>
                <p>Q&A place에 오신 것을 환영합니다.</p>
                <h3>계정 정보</h3>
                <div className="form-group">
                    <label htmlFor="username">*아이디</label>
                    
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={handleUsernameChange} 
                            placeholder="아이디를 입력하세요"
                            required 
                        />
                        <button type="button" className="check-button">중복확인</button>
                   
                </div>
                <div className="form-group">
                    <label htmlFor="email">*이메일</label>
                    
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={handleEmailChange} 
                            placeholder="이메일을 입력하세요"
                            required 
                        />
                        <button type="button" className="check-button">중복확인</button>
                    
                </div>
                <h3>비밀번호 설정</h3>
                <div className="form-group">
                    <label htmlFor="password">*비밀번호</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        placeholder="비밀번호를 입력하세요"
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">*비밀번호 확인</label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                        placeholder="비밀번호를 다시 입력하세요"
                        required 
                    />
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                </div>
                <div className="form-group">
                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="terms-agreement" 
                            checked={termsAgreed} 
                            onChange={handleTermsAgreementChange} 
                            required 
                        />
                        <label htmlFor="terms-agreement">이용약관에 동의합니다.</label>
                    </div>
                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="privacy-policy-agreement" 
                            checked={privacyPolicyAgreed} 
                            onChange={handlePrivacyPolicyAgreementChange} 
                            required 
                        />
                        <label htmlFor="privacy-policy-agreement">개인정보처리방침에 동의합니다.</label>
                    </div>
                </div>
                <button type="submit" className="submit-button">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpForm;
