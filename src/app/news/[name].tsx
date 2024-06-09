import { useEffect, useState } from 'react';
import { Article } from '../types/article';

const NewsDetailPage = ({ params }: { params: { name: string } }) => {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`/api/articles/${encodeURIComponent(params.name)}`);
      if (res.ok) {
        const data = await res.json();
        setArticle(data);
      } else {
        console.error('Failed to fetch article');
      }
    };

    fetchArticle();
  }, [params.name]);

  if (!article) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <p>Autor: {article.author}</p>
      <p>Publicado em: {new Date(article.publishedAt).toLocaleDateString()}</p>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
    </div>
  );
};

export default NewsDetailPage;