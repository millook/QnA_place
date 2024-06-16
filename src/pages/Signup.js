import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [emailAvailable, setEmailAvailable] = useState(null);
    const [nicknameAvailable, setNicknameAvailable] = useState(null);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setUsernameAvailable(null); // Reset availability status on change
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailAvailable(null); // Reset availability status on change
    };

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
        setNicknameAvailable(null); // Reset availability status on change
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

    const checkAvailability = (type) => {
        // Placeholder for the actual availability check logic
        switch(type) {
            case 'username':
                setUsernameAvailable(true);
                break;
            case 'email':
                setEmailAvailable(true);
                break;
            case 'nickname':
                setNicknameAvailable(true);
                break;
            default:
                break;
        }
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
            nickname: nickname,
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
                navigate('/signupComplete');
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
                <div className='signup-title'>
                <h2>회원가입</h2>
                <p>Q&A place에 오신 것을 환영합니다.</p>
                </div>
                <div className='account_info'>계정 정보</div>
                <div className='form-group'>
                <label htmlFor="username">*아이디</label>
                <div className="form-group-inline">
                    <input 
                        className='input_field'
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={handleUsernameChange} 
                        placeholder="아이디를 입력하세요"
                        required 
                    />
                    <button type="button" className="dup-button" onClick={() => checkAvailability('username')}>중복확인</button>
                </div>
                <div>
                    {usernameAvailable === true && <div className="info-message">사용이 가능한 아이디입니다.</div>} 
                    {usernameAvailable === false && <div className="error-message">아이디가 이미 사용 중입니다.</div>}
                </div>
                </div>
                <label htmlFor="email">*이메일</label>
                <div className='form-group'>
                <div className="form-group-inline">
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        placeholder="이메일을 입력하세요"
                        required 
                    />
                    <button type="button" className="dup-button" onClick={() => checkAvailability('email')}>중복확인</button>
                </div>
                <div>
                    {emailAvailable === true && <div className="info-message">사용이 가능한 이메일입니다.</div>}
                    {emailAvailable === false && <div className="error-message">이메일이 이미 사용 중입니다.</div>}
                </div>
                </div>
                <label htmlFor="nickname">*닉네임</label>
                
                <div className='form-group'>
                <div className="form-group-inline">
                    <input 
                        type="text" 
                        id="nickname" 
                        value={nickname} 
                        onChange={handleNicknameChange} 
                        placeholder="닉네임을 입력하세요"
                        required 
                    />
                    <button type="button" className="dup-button" onClick={() => checkAvailability('nickname')}>중복확인</button>
                </div>
                <div>
                    {nicknameAvailable === true && <div className="info-message">사용이 가능한 닉네임입니다.</div>}
                    {nicknameAvailable === false && <div className="error-message">닉네임이 이미 사용 중입니다.</div>}
                </div>
                </div>

                <div className='account_info'>비밀번호 설정</div>
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
                <label htmlFor="confirm-password">*비밀번호 확인</label>
                <div className="form-group">
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
                <div className="checkbox-group">
                    <input 
                        type="checkbox" 
                        id="terms-agreement" 
                        checked={termsAgreed} 
                        onChange={handleTermsAgreementChange} 
                        required 
                    />
                    <div>이용약관에 동의합니다.</div>
                </div>
                <div className="checkbox-group">
                    <input 
                        type="checkbox" 
                        id="privacy-policy-agreement" 
                        checked={privacyPolicyAgreed} 
                        onChange={handlePrivacyPolicyAgreementChange} 
                        required 
                    />
                    <div>개인정보처리방침에 동의합니다.</div> 
                </div>
                <button type="submit" className="submit-button">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpForm;
