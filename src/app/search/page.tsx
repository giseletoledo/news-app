"use client";

import { useState } from 'react';
import NewsCard from '../components/NewsCard';
import { Article } from '../types/article';
import { useRouter } from 'next/navigation';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
    const data = await res.json();
    setArticles(data.articles.slice(0, 30));
  };

  const handleArticleClick = (article: Article) => {
    const query = new URLSearchParams(article as any).toString();
    router.push(`/news/details?${query}`);
  };

  return (
    <div className="container">
      <h1 className="my-4 news-title">Buscar Notícias 
      <i className="bi bi-search ms-1"></i>
      </h1>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite sua busca"
          />
        </div>
        <button type="submit" className="btn btn-danger">Buscar</button>
      </form>
      <div className="row mt-4">
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

export default SearchPage;
