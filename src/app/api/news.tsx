import type { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '../types/article';

let articles: Article[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title } = req.query;
  const article = articles.find(article => article.title === title);

  if (!article) {
    res.status(404).json({ message: 'Article not found' });
    return;
  }

  res.status(200).json(article);
}
