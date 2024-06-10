
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsCard from '../components/NewsCard';
import { Article } from '../types/article';

const TopHeadlinesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

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

  const handleArticleClick = (article: Article) => {
    const query = new URLSearchParams(article as any).toString();
    router.push(`/news/details?${query}`);
  };

  return (
    <div className="container">
      <h1 className="my-4">Notícias Principais</h1>
      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <NewsCard
              article={article}
              onClick={handleArticleClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopHeadlinesPage;
