import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './answerCreate.css';

function AnswerCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [answer, setAnswer] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/articles/${id}`);
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        setArticle(data);
        const initialAnswer = {};
        data.questionHeaders.questionHeaders.forEach((_, index) => {
          initialAnswer[index] = '';
        });
        setAnswer(initialAnswer);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleAnswerChange = (index, value) => {
    setAnswer((prevAnswers) => ({
      ...prevAnswers,
      [index]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: !value.trim()
    }));
  };

  //답변등록함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedAnswers = Object.values(answer);
    const newErrors = {};
  
    let hasError = false;
    article.questionHeaders.questionHeaders.forEach((_, index) => {
      if (formattedAnswers[index].trim() === '') {
        newErrors[index] = '빈칸을 입력해주세요.';
        hasError = true;
      }
    });
  
    if (hasError) {
      setErrors(newErrors);
      return;
    }
  
    const questionBodies = article.questionHeaders.questionHeaders.map((question, index) => {
      if (question.type === 'MultipleChoiceQuestionHeader') {
        const choiceIndex = question.content.split(',').indexOf(answer[index].trim());
        return {
          "@type": "MultipleChoiceQuestionBodyRequest",
          questionHeaderId: question.id,
          choice: choiceIndex + 1
        };
      } else if (question.type === 'LongQuestionHeader') {
        return {
          "@type": "LongQuestionBodyRequest",
          questionHeaderId: question.id,
          body: answer[index]
        };
      } else {
        return {
          "@type": "ShortQuestionBodyRequest",
          questionHeaderId: question.id,
          body: answer[index]
        };
      }
    });
  
    const requestBody = { questionBodies };
  
    console.log('Request Body:', requestBody); // 요청 데이터 콘솔에 출력
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '1'
      },
      body: JSON.stringify(requestBody),
    };
  
    try {
      const response = await fetch(`/articles/${id}/answers`, requestOptions);
      if (response.ok) {
        const result = await response.json();
        const newAnswerId = result.id;
        navigate(`/articleDetail/${id}`, { state: { answerid: newAnswerId } });
      } else {
        const errorText = await response.text();
        console.error('Failed to submit answer:', errorText);
        alert('답변 등록에 실패했습니다.');
      }
    } catch (error) {
      alert('Error registering answer: ' + error.message);
    }
  };
  

  if (!article) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className='answer-container'>
      <div className="question-title-box">
        <h1 className="question-title">{article.title}</h1>
      </div>
      <form className='questions' onSubmit={handleSubmit}>
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
                        value={choice.trim()}
                        checked={answer[index] === choice.trim()}
                        onChange={() => handleAnswerChange(index, choice.trim())}
                      />
                      <span>{choice.trim()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <textarea
                  className="descriptive-answer"
                  value={answer[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="답변을 입력하세요"
                />
              )}
              {errors[index] && (
                <div className="error-message">{errors[index]}</div>
              )}
            </div>
          </div>
        ))}
          <button type="submit" className="submit-button">답변 등록하기</button>
      </form>
    </div>
  );
}

export default AnswerCreate;
