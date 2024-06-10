import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const newsApiRes = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
    const data = await newsApiRes.json();
    const articles = data.articles.filter((article: any) => article.title !== "[Removed]");

    return NextResponse.json(articles.slice(0, 30), { status: 200 });
  } catch (error) {
    console.error('Failed to fetch top headlines:', error);
    return NextResponse.json({ message: 'Failed to fetch top headlines' }, { status: 500 });
  }
}
