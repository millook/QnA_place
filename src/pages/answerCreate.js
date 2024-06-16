import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './answerCreate.css';

function AnswerCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const raw = JSON.stringify({
      articleId: id,
      body: answer
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: raw,
      url: `/articles/${id}/answers`
    };

    try {
      const response = await axios(requestOptions);
      if (response.status === 200) {
        navigate(`/articleDetail/${id}`);
      } else {
        alert('답변 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error registering answer:', error);
      alert('Error registering answer: ' + error.message);
    }
  };

  return (
    <div className="answer-create-container">
      <h2>답변 등록</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="답변을 입력하세요."
          required
        />
        <button type="submit">답변 등록하기</button>
      </form>
    </div>
  );
}

export default AnswerCreate;
