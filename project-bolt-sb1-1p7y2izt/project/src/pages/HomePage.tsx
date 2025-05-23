import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getFlashSaleProducts } from '../services/api';
import { Product } from '../types';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getFlashSaleProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('数据加载失败，请稍后再试');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 按状态分组商品
  const activeProducts = products.filter(p => p.status === 'active');
  const upcomingProducts = products.filter(p => p.status === 'upcoming');
  const endedProducts = products.filter(p => p.status === 'ended');

  // 渲染骨架屏
  const renderSkeletons = () => {
    return Array(4).fill(0).map((_, index) => (
      <div key={index} className="product-skeleton">
        <div className="skeleton-image skeleton"></div>
        <div className="skeleton-content">
          <div className="skeleton-title skeleton"></div>
          <div className="skeleton-price skeleton"></div>
          <div className="skeleton-status skeleton"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>限时秒杀，低至1折</h1>
          <p>每天10点、14点、20点准时开抢，错过再等一年</p>
        </div>
      </section>

      {error && (
        <div className="error-message">
          <AlertTriangle size={20} />
          <span>{error}</span>
        </div>
      )}

      <section className="product-section">
        <div className="section-header">
          <h2>抢购中</h2>
          <span className="flash-tag">HOT</span>
        </div>
        
        <div className="product-grid">
          {loading ? (
            renderSkeletons()
          ) : activeProducts.length > 0 ? (
            activeProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="empty-message">
              <p>暂无正在抢购的商品，请查看即将开始的活动</p>
            </div>
          )}
        </div>
      </section>

      {upcomingProducts.length > 0 && (
        <section className="product-section">
          <div className="section-header">
            <h2>即将开始</h2>
          </div>
          
          <div className="product-grid">
            {upcomingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {endedProducts.length > 0 && (
        <section className="product-section">
          <div className="section-header">
            <h2>已结束</h2>
          </div>
          
          <div className="product-grid">
            {endedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="info-section">
        <h2>秒杀系统前端优化技术要点</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>页面静态化和资源优化</h3>
            <p>秒杀页面采用静态化处理，利用CDN分发，减少服务器压力，提升加载速度。</p>
          </div>
          <div className="info-card">
            <h3>倒计时与活动状态同步</h3>
            <p>使用服务器时间校准倒计时，避免客户端时间不准确导致的体验问题。</p>
          </div>
          <div className="info-card">
            <h3>按钮防抖与限流</h3>
            <p>对秒杀按钮进行防抖处理，避免用户连续点击导致的重复请求。</p>
          </div>
          <div className="info-card">
            <h3>排队与反馈机制</h3>
            <p>高并发下实现排队机制，实时反馈用户的排队位置，提升用户体验。</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;