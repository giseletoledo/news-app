"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Article } from '../types/article';

const NewsDetailPage = () => {
  const searchParams = useSearchParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const articleData = {
      id: searchParams.get('id'),
      title: searchParams.get('title'),
      description: searchParams.get('description'),
      urlToImage: searchParams.get('urlToImage'),
      author: searchParams.get('author'),
      publishedAt: searchParams.get('publishedAt'),
    };
    setArticle(articleData as Article);
  }, [searchParams]);

  if (!article) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <p>Autor: {article.author}</p>
      <p>Publicado em: {new Date(article.publishedAt!).toLocaleDateString()}</p>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title}  style={{ maxHeight: '350px', objectFit: 'cover' }} />}
    </div>
  );
};

export default NewsDetailPage;
