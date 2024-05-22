import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './articleDetail.css'; // Import the CSS for styling

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/articles/${id}`);

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        console.log('Fetched data:', response.data); // 응답 데이터 콘솔에 출력
        console.log(response.data.questionHeaders.questionHeaders[0]);
        setArticle(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchArticle();
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
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
                </div>
              ) : (
                <p className="descriptive-answer">{question.hint}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleDetail;