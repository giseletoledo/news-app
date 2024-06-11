'use client'
import { useState } from 'react';
import NewsCard from '../components/NewsCard';
import { Article } from '../types/article';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log('Searching news with query:', query);
      const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
      if (!res.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await res.json();
      console.log('Fetched news data:', data);
      const articles = data.articles.filter((article: any) => article.title !== "[Removed]"); 

      setArticles(articles);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Ocorreu um erro ao buscar notícias. Por favor, tente novamente mais tarde.');
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4 news-title">
        Buscar Notícias
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
      {isLoading && <LoadingSpinner />}
      {error && <div className="error-message">{error}</div>}
      {articles.length === 0 && !isLoading && !error && <p>Sem notícias disponíveis</p>}
      <div className="row mt-4">
        {articles.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <NewsCard
              article={article}
              onClick={() => window.open(article.url, '_blank')}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;