import React from 'react';
import { Article } from '../types/article';

interface NewsCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {

  const authorText = article.author || 'Autor não disponível';

  return (
    <div className="card h-100">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          className="card-img-top"
          alt={article.title || 'Título não disponível'}
          style={{ maxHeight: '150px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{article.title || 'Título não disponível'}</h5>
        {article.description && <p className="card-text">{article.description}</p>}
        <p className='card-text'>Autor: {authorText}</p>
        {article.publishedAt && <p className="card-text"><small className="text-muted">{new Date(article.publishedAt).toLocaleDateString()}</small></p>}
       <button onClick={() => onClick(article)} className="btn btn-danger">Detalhes</button>
      </div>
    </div>
  );
};

export default NewsCard;