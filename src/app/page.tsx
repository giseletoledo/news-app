"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsCard from './components/NewsCard';
import { Article } from './types/article';
import LoadingSpinner from './components/LoadingSpinner';

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;
  const router = useRouter();

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        //Adiciona um atraso artificial de 2 segundos para testes
        await new Promise(resolve => setTimeout(resolve,2000))

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
          //setIsLoading(false);
          setError('Não foram encontradas notícias.');
        }
      } catch (error) {
        console.error('Erro ao carregar notícias:', error instanceof Error ? error.message : 'Erro desconhecido');
        // Limpa a lista de artigos em caso de erro
        setArticles([]);
        setError('Ocorreu um erro ao carregar as notícias. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  const handleArticleClick = (article: Article) => {
    const query = new URLSearchParams(article as any).toString();
    router.push(`/news/details?${query}`);
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <div className='error-message'>{error}</div>
  }

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