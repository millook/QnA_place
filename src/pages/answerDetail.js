import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './answerDetail.css'; // 동일한 CSS 파일 사용

function AnswerDetail() {
  const { articleId, answerId } = useParams();
  const [article, setArticle] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/articles/${articleId}`);

        if (response.status !== 200) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }

        setArticle(response.data);

        const foundAnswer = response.data.answers.answers.find(ans => ans.id === parseInt(answerId));
        if (!foundAnswer) {
          throw new Error('답변을 찾을 수 없습니다.');
        }

        console.log('데이터:', foundAnswer); // 응답 데이터를 콘솔에 출력합니다.
        setAnswer(foundAnswer);
      } catch (error) {
        setError(error);
      }
    };

    fetchArticle();
  }, [articleId, answerId]);

  if (error) {
    return <div>에러: {error.message}</div>;
  }

  if (!article || !answer) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className='article-container'>
      <div className="question-title-box">
        <h1 className="question-title">{article.title}</h1>
      </div>
      <div className='questions'>
        {article.questionHeaders && article.questionHeaders.questionHeaders.map((question, index) => (
          <div key={index} className='question-container'>
            <div className="question">
              <div className="question-details">
                <h2 className="question-details-input">{question.title}</h2>
              </div>
              {question.type === 'MultipleChoiceQuestionHeader' ? (
                <div className="multiple-options">
                  {question.content.split(',').map((choice, i) => (
                    <div key={i} className="option">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={parseInt(answer.bodies[index]) === i + 1}
                        readOnly
                      />
                      <span>{choice.trim()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <textarea
                  className="descriptive-answer"
                  value={answer.bodies[index]}
                  readOnly
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">뒤로 가기</button>
    </div>
  );
}

export default AnswerDetail;
