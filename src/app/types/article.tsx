export interface Article {
  id:string | null;
    source?: {
      id?: string | null;
      name?: string;
    };
    author?: string | 'null';
    title?: string;
    description?: string | null;
    url?: string;
    urlToImage?: string;
    publishedAt?: string;
    content?: string | null;
  }
  