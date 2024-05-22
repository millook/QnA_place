import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './articleCreate.css';

const ArticleCreate = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questions, setQuestions] = useState([{ id: 1, type: 'multiple', title: '', options: [''] }]);
  const [nextQuestionId, setNextQuestionId] = useState(2);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleChangeQuestionTitle = (e) => {
    setQuestionTitle(e.target.value);
  };

  const handleChangeType = (e, id) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === id) {
        return { ...question, type: e.target.value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleChangeQuestionDetail = (e, id) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === id) {
        return { ...question, title: e.target.value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // 상태 저장
  const handleChangeOption = (e, questionId, optionIndex) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedOptions = [...question.options];
        updatedOptions[optionIndex] = e.target.value;
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // 옵션 추가 함수
  const handleAddOption = (questionId) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        return { ...question, options: [...question.options, ''] };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // 질문 추가 함수
  const handleAddQuestion = () => {
    const newQuestion = { id: nextQuestionId, type: 'multiple', title: '', options: [''] };
    setQuestions([...questions, newQuestion]);
    setNextQuestionId(nextQuestionId + 1);

    // 새 질문이 추가된 후에 화면의 맨 아래로 스크롤 이동
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 0);
  };

  // 옵션 삭제 함수
  const handleRemoveOption = (questionId, optionIndex) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedOptions = question.options.filter((_, index) => index !== optionIndex);
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // 질문 삭제 함수
  const handleRemoveQuestion = (questionId) => {
    const updatedQuestions = questions.filter(question => question.id !== questionId);
    setQuestions(updatedQuestions);
  };


  // 질문등록하기 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // questionHeaders 생성
    const questionHeaders = questions.map((question, index) => {
      if (question.type === 'multiple') {
        return {
          "@type": "MultipleChoiceQuestionHeaderRequest",
          title: question.title,
          description: "",
          choices: question.options
        };
      } else if (question.type === 'descriptive') {
        return {
          "@type": "LongQuestionHeaderRequest",
          title: question.title,
          description: "",
          hint: ""
        };
      } else {
        return {
          "@type": "ShortQuestionHeaderRequest",
          title: question.title,
          description: "",
          hint: ""
        };
      }
    });

    // requestBody 생성
    const requestBody = {
      memberId: 1,
      date: new Date().toISOString(),
      title: questionTitle,
      body: "Article 5 Body", // 사용자가 입력한 내용으로 대체해야 함
      categoryId: 1,
      questionHeaders: {
        values: questionHeaders
      }
    };

    console.log('Request Body:', JSON.stringify(requestBody));

    // post api 호출 (질문 등록)
    try {
      const response = await fetch("/articles", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '1'
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        const newQuestionId = result.id; // Assuming the response contains the new question ID
        navigate(`/ArticleComplete`, {state : { articleId: newQuestionId }});
        // 완료 페이지로 이동
      } else {
        const errorText = await response.text();
        console.error('Failed to submit questions:', errorText);
      }
    } catch (error) {
      console.error('Error submitting questions:', error);
    }
};

  //html
  return (
    <div className="articles-container">
      <form onSubmit={handleSubmit}>
        <div className="question-title-box">
          <input
            type="text"
            value={questionTitle}
            className='question-title'
            onChange={handleChangeQuestionTitle}
            placeholder="질문 제목을 입력하세요"
          />
        </div>
        <div className="question-box">
          {questions.map((question) => (
            <div key={question.id} className="question-container">
              <div className="question">
                {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(question.id)} 
                        className="remove-question-button" 
                      >
                        X
                      </button>
                )}
                <div className="question-details">
                  <input
                    type="text"
                    value={question.title}
                    onChange={(e) => handleChangeQuestionDetail(e, question.id)}
                    className="question-details-input"
                    placeholder="세부 질문을 입력하세요"
                  />
                  <select
                    value={question.type}
                    onChange={(e) => handleChangeType(e, question.id)}
                    className="question-type"
                  >
                    <option value="multiple">선택형 질문</option>
                    <option value="descriptive">서술형 질문</option>
                  </select>
                </div>
                {question.type === 'multiple' ? (
                  <div className="multiple-options">
                    {question.options.map((option, index) => (
                      <div key={index} className="option">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          disabled
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleChangeOption(e, question.id, index)}
                          className="option-input"
                          placeholder="옵션을 입력하세요"
                        />
                        <button
                          className="remove-option-button"
                          onClick={() => handleRemoveOption(question.id, index)}
                          type="button"
                        >
                          x
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddOption(question.id)}
                      className="add-option-button"
                    >
                      옵션 추가
                    </button>
                  </div>
                ) : (
                  <textarea
                    className="descriptive-answer"
                    disabled
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="button-group">
          <button type="button" onClick={handleAddQuestion} className="add-question-button">
            질문 추가하기
          </button>
          <button type="submit" className="submit-question-button">
            질문 등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleCreate;