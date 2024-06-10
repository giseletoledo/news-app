"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsCard from './components/NewsCard';
import { Article } from './types/article';

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&pageSize=${itemsPerPage}&page=${currentPage}`);
      const data = await res.json();
      const articlesWithId = data.articles.map((article: Article) => ({
        ...article,
        id: generateId(),
      }));

      setArticles(articlesWithId);
    };

    fetchNews();
  }, [currentPage]);

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleArticleClick = (article: Article) => {
    const query = new URLSearchParams(article as any).toString();
    router.push(`/news/details?${query}`);
  };

  return (
    <div className="container">
      <h1 className="my-4">Últimas Notícias</h1>
      <div className="row">
        {articles.map((article) => (
          <div key={article.id} className="col-md-4 mb-4">
            <NewsCard
              article={article}
              onClick={handleArticleClick}
            />
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>Próxima</button>
      </div>
    </div>
  );
};

export default HomePage;