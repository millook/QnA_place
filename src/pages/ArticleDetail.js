import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './articleDetail.css'; // 스타일링을 위해 CSS를 임포트합니다.

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/articles/${id}`);

        if (response.status !== 200) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        console.log('데이터:', response.data); // 응답 데이터를 콘솔에 출력합니다.
        setArticle(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchArticle();
  }, [id]);

  if (error) {
    return <div>에러: {error.message}</div>;
  }

  if (!article) {
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
                <p>{question.description}</p>
              </div>
              {question['@type'] === 'MultipleChoiceQuestionHeaderRequest' ? (
                <div className="multiple-options">
                  {question.choices && question.choices.map((choice, i) => (
                    <div key={i} className="option">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        disabled
                      />
                      <span>{choice}</span>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {}}
                    className="add-option-button"
                    disabled
                  >
                    옵션 추가
                  </button>
                </div>
              ) : (
                <textarea
                  className="descriptive-answer"
                  value={question.hint}
                  readOnly
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleDetail;
