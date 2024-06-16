import React from 'react';
import { useNavigate } from 'react-router-dom';
import './signupComplete.css';

function SignupComplete() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="complete-container">
      <div className="complete-title">
        회원가입 완료
      </div>
      <div className="complete-script">
        회원가입이 완료되었습니다. <br />
        이제 로그인하여 서비스를 이용해보세요!
      </div>
      <button className="check-button" onClick={handleLoginRedirect}>
        로그인하러 가기
      </button>
    </div>
  );
}

export default SignupComplete;
