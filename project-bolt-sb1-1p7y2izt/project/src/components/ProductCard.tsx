import React from 'react';
import { Link } from 'react-router-dom';
import { Product, SaleStatus } from '../types';
import Countdown from './Countdown';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getStatusDisplay = (status: SaleStatus): React.ReactNode => {
    switch (status) {
      case 'upcoming':
        return (
          <div className="product-status upcoming">
            <span>即将开始</span>
            <Countdown endTime={product.startTime} />
          </div>
        );
      case 'active':
        return (
          <div className="product-status active">
            <span className="flash-tag">抢购中</span>
            <span className="product-remaining">
              剩余: {product.stock} / {product.totalStock}
            </span>
          </div>
        );
      case 'ended':
        return (
          <div className="product-status ended">
            <span>已结束</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.status === 'active' && (
          <div className="product-badge pulse">抢购中</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price-container">
          <span className="product-price">¥{product.flashPrice}</span>
          <span className="product-original-price">¥{product.originalPrice}</span>
        </div>
        {getStatusDisplay(product.status)}
      </div>
    </Link>
  );
};

export default ProductCard;