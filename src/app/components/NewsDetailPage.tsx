"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Article } from '../types/article';
import LoadingSpinner from './LoadingSpinner';

const NewsDetailPage = () => {
  const searchParams = useSearchParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const articleData = {
      id: searchParams.get('id'),
      title: searchParams.get('title'),
      description: searchParams.get('description'),
      urlToImage: searchParams.get('urlToImage'),
      author: searchParams.get('author') || '',
      publishedAt: searchParams.get('publishedAt'),
    };
    const timer = setTimeout(()=>{
      setArticle(articleData as Article);
    },6000)

    return () => clearTimeout(timer);
  }, [searchParams]);



  if (!article) {
    return <LoadingSpinner/>;
  }

  const handleNullValue = (value: string | undefined | null, defaultValue: string) => {
    return value !== null && value !== undefined && value !== '' ? value : defaultValue;
  };
  

  return (
    <div className='container-with-margin'>
      <h1 className='text-danger'>{handleNullValue(article.title, 'Titulo não disponível')}</h1>
      <p className='text-secondary'>{article.description}</p>
      <p className='text-muted'>Autor: {handleNullValue(article.author, 'Autor não disponível')}</p>
      <p className='text-muted'>Publicado em: {new Date(article.publishedAt!).toLocaleDateString()}</p>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title}  style={{ maxHeight: '350px', objectFit: 'cover' }} />}
    </div>
  );
};

export default NewsDetailPage;
