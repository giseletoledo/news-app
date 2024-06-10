
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
    // Filtrar as propriedades do artigo para remover aquelas que são nulas ou vazias
    const filteredArticle = Object.fromEntries(
      Object.entries(article).filter(([_, value]) => value !== null && value !== '')
    );
  
    // Montar a querystring com os dados do artigo filtrados
    const query = new URLSearchParams(filteredArticle as any).toString();
  
    // Navegar para a página de detalhes com a querystring
    router.push(`/news/details?${query}`);
  };
  
  return (
    <div className="container">
      <h1 className="news-title my-4">
        Notícias Principais
        <i className="bi bi-newspaper ms-1"></i>
        </h1>
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
