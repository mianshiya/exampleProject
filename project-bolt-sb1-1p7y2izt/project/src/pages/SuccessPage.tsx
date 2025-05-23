import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Home } from 'lucide-react';
import './SuccessPage.css';

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 从location state获取商品信息
  const { productId, productName, productPrice } = location.state || {};
  
  // 生成随机订单号
  const orderNumber = `FD${Date.now().toString().slice(-10)}${Math.floor(Math.random() * 1000)}`;
  
  // 模拟订单时间
  const orderTime = new Date().toLocaleString('zh-CN');

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-header">
          <div className="success-icon">
            <ShoppingBag size={32} />
          </div>
          <h1>抢购成功！</h1>
          <p>恭喜你，商品抢购成功</p>
        </div>
        
        {productId && (
          <div className="order-details">
            <h2>订单信息</h2>
            
            <div className="order-info-item">
              <span className="label">订单编号</span>
              <span className="value">{orderNumber}</span>
            </div>
            
            <div className="order-info-item">
              <span className="label">下单时间</span>
              <span className="value">{orderTime}</span>
            </div>
            
            <div className="order-info-item">
              <span className="label">商品名称</span>
              <span className="value">{productName || '未知商品'}</span>
            </div>
            
            <div className="order-info-item">
              <span className="label">支付金额</span>
              <span className="value price">¥{productPrice || '0.00'}</span>
            </div>
          </div>
        )}
        
        <div className="success-actions">
          <button 
            className="action-button primary" 
            onClick={() => navigate('/')}
          >
            <Home size={18} />
            <span>返回首页</span>
            <ChevronRight size={16} />
          </button>
          
          <button 
            className="action-button secondary"
            onClick={() => window.location.reload()}
          >
            <ShoppingBag size={18} />
            <span>继续抢购</span>
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="success-tips">
          <h3>秒杀攻略</h3>
          <ul>
            <li>提前关注活动时间，设置闹钟提醒</li>
            <li>登录账号并确保信息完整</li>
            <li>抢购开始前几分钟进入页面等待</li>
            <li>高峰期遇到排队属正常现象，请耐心等待</li>
          </ul>
        </div>
      </div>
      
      <div className="tech-explanation">
        <h2>前端优化技术解析</h2>
        <p>通过本演示，我们展示了以下秒杀系统前端优化技术：</p>
        <ul>
          <li>
            <strong>前端静态化与资源优化</strong> - 将活动页面静态化，减少服务器渲染压力
          </li>
          <li>
            <strong>按钮防抖与状态控制</strong> - 防止用户短时间内多次点击导致重复下单
          </li>
          <li>
            <strong>服务器时间同步</strong> - 使用服务器时间校准倒计时，保证所有用户体验一致
          </li>
          <li>
            <strong>前端排队机制</strong> - 高并发下实现排队等待，有效控制请求压力，提供友好反馈
          </li>
          <li>
            <strong>验证码防刷措施</strong> - 通过滑动验证码等机制，防止机器人和刷单行为
          </li>
          <li>
            <strong>降级与异常处理</strong> - 在系统压力过大时进行前端降级，保证核心功能可用
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SuccessPage;