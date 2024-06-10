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

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`https://newsapi.org/v2/everything?q=apple&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&pageSize=${itemsPerPage}&page=${currentPage}`);
      const data = await res.json();

      if (data.articles && data.articles.lenght > 0) {
        const articlesWithId = data.articles
        .filter((article: any) => article.title !== "[Removed]")
        .map((article: Article) => ({
          ...article,
          id: generateId(),
        }));
  
        setArticles(articlesWithId);
      }
     
    };

    fetchNews();
  }, [currentPage]);

 

  const handleArticleClick = (article: Article) => {
    const query = new URLSearchParams(article as any).toString();
    router.push(`/news/details?${query}`);
  };

  return (
    <div className="container">
      <h1 className="news-title my-4">Últimas Notícias</h1>
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
      <div className='text-center'>
        <button className='btn btn-danger mx2' onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <button className='btn btn-danger mx2 ms-2' onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>Próxima</button>
      </div>
    </div>
  );
};

export default HomePage;