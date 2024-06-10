import Link from 'next/link';
import React from 'react';

const NewsCard: React.FC<NewsCardProps> = ({ id, title, description, imageUrl, author, publishedAt }) => {
  return (
    <div className="card h-100">
      {imageUrl && <img src={imageUrl} className="card-img-top" alt={title} style={{ maxHeight: '150px', objectFit: 'cover' }} />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {description && <p className="card-text">{description}</p>}
        {author && <p className="card-text"><small className="text-muted">By {author}</small></p>}
        {publishedAt && <p className="card-text"><small className="text-muted">{new Date(publishedAt).toLocaleDateString()}</small></p>}
        <Link href={`/news/${encodeURIComponent(id)}`} className="btn btn-primary">Detalhes</Link>
      </div>
    </div>
  );
};

export default NewsCard;
