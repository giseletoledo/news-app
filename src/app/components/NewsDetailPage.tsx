"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Article } from '../types/article';

const NewsDetailPage = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  console.log(title)
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!title) return;

    const fetchArticle = async () => {
      const res = await fetch(`https://newsapi.org/v2/everything?q=${title}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setArticle(data);
      } else {
        console.error('Failed to fetch article');
      }
    };

    fetchArticle();
  }, [title]);

  if (!article) {
    console.log(article)
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <p>Autor: {article.author}</p>
      <p>Publicado em: {new Date(article.publishedAt ?? '').toLocaleDateString()}</p>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
    </div>
  );
};

export default NewsDetailPage;