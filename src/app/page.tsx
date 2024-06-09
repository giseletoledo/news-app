"use client"
import { useEffect, useState } from 'react';
import NewsCard from './components/NewsCard';
import { Article } from './types/article';

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 10; // Número de itens por página

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&pageSize=${itemsPerPage}&page=${currentPage}`);
      const data = await res.json();
      const articlesWithId = data.articles.map((article:Article) => ({
        ...article,
        id: generateId(), // Gere o ID separadamente
      }));
      setArticles(articlesWithId);
    };

    fetchNews();
  }, [currentPage]); // Atualize os artigos sempre que a página atual mudar

  // Função para gerar um ID único
  const generateId = () => {
    return Math.random().toString(36).substr(2, 9); // Gera uma sequência aleatória de 9 caracteres alfanuméricos
  };

  // Função para ir para a próxima página
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Função para ir para a página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container">
      <h1 className="my-4">Últimas Notícias</h1>
      <div className="row">
        {articles.map((article) => (
          <div key={article.id} className="col-md-4 mb-4">
            <NewsCard
              id={article.id}
              title={article.title}
              description={article.description || ''}
              imageUrl={article.urlToImage || ''}
              author={article.author || ''}
              publishedAt={article.publishedAt}
            />
          </div>
        ))}
      </div>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={nextPage}>Próxima</button>
      </div>
    </div>
  );
};

export default HomePage;


