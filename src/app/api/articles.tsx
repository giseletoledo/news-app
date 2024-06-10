import type { NextApiRequest, NextApiResponse } from 'next'
import { Article } from '../types/article'

let articles: Article[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(articles);
  } else if (req.method === 'POST') {
    const article: Article = req.body;
    articles.push(article);
    res.status(201).json({ message: 'Article added' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
