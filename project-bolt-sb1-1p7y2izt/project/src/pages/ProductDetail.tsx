import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Check, AlertTriangle } from 'lucide-react';
import Countdown from '../components/Countdown';
import FlashButton from '../components/FlashButton';
import CaptchaModal from '../components/CaptchaModal';
import QueueModal from '../components/QueueModal';
import { getProductDetail, submitOrder } from '../services/api';
import { Product } from '../types';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  
  // 模拟随机排队位置
  const queuePosition = Math.floor(Math.random() * 50) + 1;
  const queueTotal = Math.floor(Math.random() * 100) + 100;

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductDetail(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('商品信息加载失败，请刷新重试');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyClick = async () => {
    // 弹出验证码
    setShowCaptcha(true);
  };

  const handleVerifySuccess = () => {
    setShowCaptcha(false);
    
    // 显示排队窗口
    setShowQueue(true);
  };

  const handleOrderSuccess = async () => {
    try {
      if (!product) return;
      
      // 提交订单
      await submitOrder(product.id);
      setOrderSubmitted(true);
      
      // 跳转到成功页面
      navigate('/success', { 
        state: { 
          productId: product.id,
          productName: product.name,
          productPrice: product.flashPrice
        } 
      });
    } catch (err) {
      setError('下单失败，请重试');
    }
  };

  // 商品是否可购买
  const isAvailable = product?.status === 'active';
  
  // 商品是否已售罄
  const isSoldOut = product?.stock === 0;
  
  // 活动是否已结束
  const isEnded = product?.status === 'ended';
  
  // 倒计时结束处理
  const handleCountdownEnd = () => {
    if (product?.status === 'upcoming') {
      // 模拟更新商品状态为活动中
      setProduct(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: 'active'
        };
      });
    }
  };

  if (loading) {
    return (
      <div className="product-detail-skeleton">
        <div className="skeleton-layout">
          <div className="skeleton-image skeleton"></div>
          <div className="skeleton-info">
            <div className="skeleton-title skeleton"></div>
            <div className="skeleton-price skeleton"></div>
            <div className="skeleton-description skeleton"></div>
            <div className="skeleton-button skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <AlertTriangle size={48} />
        <h2>出错了</h2>
        <p>{error || '商品不存在或已下架'}</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          返回首页
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
          {product.status === 'active' && (
            <span className="image-badge pulse">抢购中</span>
          )}
        </div>
        
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-price-box">
            <div className="price-container">
              <span className="current-price">¥{product.flashPrice}</span>
              <span className="original-price">¥{product.originalPrice}</span>
              <span className="discount">
                {Math.round((product.flashPrice / product.originalPrice) * 10)}折
              </span>
            </div>
            
            {product.status === 'active' && (
              <div className="stock-info">
                库存: <span className={isSoldOut ? 'sold-out' : ''}>{product.stock}</span> / {product.totalStock}
              </div>
            )}
          </div>
          
          <div className="status-container">
            {product.status === 'upcoming' && (
              <div className="upcoming-info">
                <Clock size={18} />
                <span>距离开始还有</span>
                <Countdown 
                  endTime={product.startTime} 
                  onEnd={handleCountdownEnd}
                />
              </div>
            )}
            
            {product.status === 'active' && (
              <div className="active-info">
                <Check size={18} />
                <span>活动正在进行中</span>
              </div>
            )}
            
            {product.status === 'ended' && (
              <div className="ended-info">
                <AlertTriangle size={18} />
                <span>活动已结束</span>
              </div>
            )}
          </div>
          
          <div className="product-description">
            <h3>商品描述</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="action-container">
            <FlashButton
              text={
                isSoldOut ? '已售罄' : 
                isEnded ? '活动已结束' : 
                isAvailable ? '立即抢购' : '即将开始'
              }
              loadingText="处理中..."
              successText="抢购成功"
              errorText="抢购失败"
              onClick={handleBuyClick}
              disabled={!isAvailable || isSoldOut || orderSubmitted}
            />
            
            <div className="tips">
              <p>温馨提示:</p>
              <ul>
                <li>每个账号限购1件</li>
                <li>活动期间无法取消订单</li>
                <li>抢购高峰期请耐心等待，刷新页面将失去排队资格</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="feature-explanation">
        <h2>秒杀系统前端优化技术示例</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>按钮防抖和状态控制</h3>
            <p>抢购按钮实现了防抖处理，避免用户短时间内多次点击导致的重复请求。点击后按钮立即禁用并显示状态反馈。</p>
          </div>
          <div className="feature-item">
            <h3>验证码防刷机制</h3>
            <p>通过滑动验证码进行人机验证，减少机器人和刷单行为，保证购买公平性。</p>
          </div>
          <div className="feature-item">
            <h3>排队和反馈机制</h3>
            <p>高并发场景下实现前端排队，展示实时排队位置和进度，提升用户耐心和体验。</p>
          </div>
          <div className="feature-item">
            <h3>界面状态和用户引导</h3>
            <p>清晰展示商品状态（即将开始、抢购中、已结束），引导用户正确操作，减少用户疑惑。</p>
          </div>
        </div>
      </div>
      
      {/* 验证码模态框 */}
      <CaptchaModal
        isOpen={showCaptcha}
        onClose={() => setShowCaptcha(false)}
        onVerify={handleVerifySuccess}
      />
      
      {/* 排队模态框 */}
      <QueueModal
        isOpen={showQueue}
        onClose={() => setShowQueue(false)}
        onSuccess={handleOrderSuccess}
        queuePosition={queuePosition}
        queueTotal={queueTotal}
      />
    </div>
  );
};

export default ProductDetail;