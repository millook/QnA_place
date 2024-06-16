import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './articleDetail.css'; // 스타일링을 위해 CSS를 임포트합니다.

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const answersPerPage = 5;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/articles/${id}`);

        if (response.status !== 200) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        console.log('데이터:', response.data); // 응답 데이터를 콘솔에 출력합니다.
        setArticle(response.data);
        setAnswers(response.data.answers.answers);
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

  const handleAnswerCreate = () => {
    navigate(`/answerCreate/${id}`);
  };

  // 현재 페이지에 해당하는 답변들 계산
  const indexOfLastAnswer = currentPage * answersPerPage;
  const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
  const currentAnswers = answers.slice(indexOfFirstAnswer, indexOfLastAnswer);

  // 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(answers.length / answersPerPage); i++) {
    pageNumbers.push(i);
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
                        disabled
                      />
                      <span>{choice.trim()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <textarea
                  className="descriptive-answer"
                  value={question.content}
                  readOnly
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAnswerCreate} className="answer-create-button">답변 등록하기</button>
      <div className="answers-container">
        <h2>답변리스트</h2>
        {currentAnswers.map((answer, index) => (
          <div key={answer.id} className="answer">
            <span>{indexOfFirstAnswer + index + 1}. {answer.author}</span>
            <button onClick={() => navigate(`/answerDetail/${id}/${answer.id}`)}>답변보러가기</button>
          </div>
        ))}
      </div>
      <div className="article_pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default ArticleDetail;
