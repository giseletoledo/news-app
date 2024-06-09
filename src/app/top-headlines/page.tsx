"use client"
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { useNavigation } from 'next/navigation'; // Use useNavigation for Server Components
import NewsCard from '../components/NewsCard';
import { Article } from '../types/article';

const TopHeadlinesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigation = useNavigation(); // Use useNavigation

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top-headlines`); // Use process.env.NEXT_PUBLIC_API_BASE_URL for dynamic base URL
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch top headlines:', error);
        navigation.push('/error'); // Navigate to error page on fetch error
      }
    };

    fetchTopHeadlines();
  }, [navigation]); // Re-fetch data on navigation changes (optional)

  return (
    <div className="container">
      <h1 className="my-4">Notícias Principais</h1>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article.title}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Carregando notícias...</p>
      )}
    </div>
  );
};

export default TopHeadlinesPage;

