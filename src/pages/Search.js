import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './home.css'; 

const Search = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  const fetchArticles = async (query = '') => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    try {
      const url = `/articles?count=10000`; // 변경된 URL
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      console.log(result);

      if (result.articles && result.articles.length > 0) {
        const filteredData = result.articles
          .filter(article => article.title.toLowerCase().includes(query.toLowerCase())) // 대소문자 구분 없이 검색
          .map(article => ({
            id: article.id, 
            title: article.title,
            category: article.category,
          }));
        if (filteredData.length > 0) {
          setArticles(filteredData);
        } else {
          setArticles([]);
          alert('검색 결과가 없습니다.');
        }
      } else {
        setArticles([]);
        alert('검색 결과가 없습니다.');
      }
    } catch (error) {
      console.log('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      setSearchQuery(query);
      fetchArticles(query);
    }
  }, [location.search]);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  // 현재 페이지에 해당하는 기사들 계산
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="home-container">
      <h1>Q&A Place</h1>
      <div className="search-container">
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="검색어를 입력하세요." 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">검색</button>
        </form>
      </div>
      <div className='title_header'>답변을 기다리는 항목</div>
      <div className="articles-container">
        {currentArticles.map((article, index) => (
          <div key={index} className="article">
            <Link to={`/articleDetail/${article.id}`}>
              <h2>{article.title}</h2>
            </Link>
            <div>카테고리 : {article.category}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
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
};

export default Search;