"use client"
import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import { Article } from '../types/article';

const TopHeadlinesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/top-headlines'); 
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch top headlines:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Notícias Principais</h1>
      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <NewsCard
              id={index.toString()}
              title={article.title}
              description={article.description || ''}
              imageUrl={article.urlToImage || ''}
              author={article.author || ''}
              publishedAt={article.publishedAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopHeadlinesPage;