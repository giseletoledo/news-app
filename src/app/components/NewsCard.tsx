import Link from 'next/link';
import React from 'react';
import { Article } from '../types/article';

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  author,
  publishedAt,
}) => {

  const handleArticleClick = (article: Article) => {
    localStorage.setItem('selectedArticle', JSON.stringify(article));
  };


  // Use `encodeURIComponent` to handle special characters in title
  const encodedTitle = encodeURIComponent(id);

  return (
    <div className="card h-100">
      {imageUrl && (
        <img
          src={imageUrl}
          className="card-img-top"
          alt={title}
          style={{ maxHeight: '150px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">
          <Link href={`/news/${encodedTitle}`}>{title}</Link>
        </h5>
        {description && <p className="card-text">{description}</p>}
        {author && <p className="card-text"><small className="text-muted">By {author}</small></p>}
        {publishedAt && <p className="card-text"><small className="text-muted">{new Date(publishedAt).toLocaleDateString()}</small></p>}
        <Link href={`/news/${encodedTitle}`}>
          <button className="btn btn-primary">Detalhes</button>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
