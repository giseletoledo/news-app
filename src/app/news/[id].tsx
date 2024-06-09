import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Article } from '../types/article';

const NewsDetails: React.FC<{ articles?: Article[]}> = ({ articles }) => {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da notícia da rota

  const [newsDetails, setNewsDetails] = useState<Article | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const selectedArticle = articles?.find((article) => article.id === id); // Busca a notícia selecionada na lista de notícias
      setNewsDetails(selectedArticle);
    }
  }, [id, articles]);

  return (
    <div>
      {newsDetails ? (
        <div>
          <h1>{newsDetails.title}</h1>
          <p>{newsDetails.description}</p>
          {/* Outros detalhes da notícia */}
        </div>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
};

export default NewsDetails;


