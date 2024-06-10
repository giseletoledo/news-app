import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newsApiRes = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
    const data = await newsApiRes.json();
    console.log(data)
    res.status(200).json(data.articles.slice(0, 30));
  } catch (error) {
    console.error('Failed to fetch top headlines:', error);
    res.status(500).json({ message: 'Failed to fetch top headlines' });
  }
}
