import type { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '../types/article';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title } = req.query;
  const searchTerm: string = Array.isArray(title) ? title[0] : title ?? '';

  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch article from News API: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.articles || data.articles.length === 0) {
      throw new Error('Article not found in News API');
    }

    const article: Article = data.articles[0];
    res.status(200).json(article);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}
