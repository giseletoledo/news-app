import type { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '../types/article';

let articles: Article[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const article = articles.find(article => article.source.id === id);

  if (!article) {
    res.status(404).json({ message: 'Article not found' });
    return;
  }

  res.status(200).json(article);
}
