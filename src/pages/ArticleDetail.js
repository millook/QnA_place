import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios 라이브러리 가져오기
import { useParams } from 'react-router-dom';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/articles/${id}`); // axios로 GET 요청 보내기

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

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
    </div>
  );
}

export default ArticleDetail;