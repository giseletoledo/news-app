"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsCard from './components/NewsCard';
import { Article } from './types/article';

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 10;
  const router = useRouter();

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&pageSize=${itemsPerPage}&page=${currentPage}`);
        if (!res.ok) {
          throw new Error('Falha ao carregar notícias');
        }
        const data = await res.json();
        // Verifica se data.articles está definido e se possui algum elemento
        if (data && data.articles && data.articles.length > 0) {
          const articlesWithId = data.articles.map((article: Article) => ({
            ...article,
            id: generateId(),
          }));
          setArticles(articlesWithId);
          setError(null);
          // Limpa qualquer mensagem de erro existente
        } else {
          // Se não houver notícias, define articles como um array vazio
          setArticles([]); 
          setError('Não foram encontradas notícias.');
          // Define uma mensagem de erro personalizada 
        }
      } catch (error) {
        //console.error('Erro ao carregar notícias:', error.message);
        // Limpa a lista de artigos em caso de erro
        setArticles([]);
        setError('Ocorreu um erro ao carregar as notícias. Por favor, tente novamente mais tarde.');
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
      {articles.length === 0 && <p>Sem notícias disponíveis</p>}
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