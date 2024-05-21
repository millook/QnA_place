import React from 'react';
import { useNavigate } from 'react-router-dom';
import './articleComplete.css';

function ArticleComplete({ id }) {
  const navigate = useNavigate();

  // 질문 확인 페이지로 이동하는 함수
  const handleCheckQuestion = () => {
    navigate(`/ArticleDetail/${id}`); // 이동할 페이지 경로에 id를 포함
  };

  return (
    <div className="complete-container">
      <div className="complete-title">
        질문등록 완료
      </div>
      <div className="complete-script">
        질문등록이 완료되었습니다. <br />
        나의 질문을 바로 확인하러 가세요!
      </div>
      <button className="check-button" onClick={handleCheckQuestion}>
        질문 확인하러 가기
      </button>
    </div>
  );
}

export default ArticleComplete;