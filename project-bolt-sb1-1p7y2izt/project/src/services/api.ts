import { Product } from '../types';

// 模拟服务器延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟获取服务器时间
export const getServerTime = async (): Promise<string> => {
  await delay(300);
  return new Date().toISOString();
};

// 模拟商品数据
const generateProducts = (): Product[] => {
  // 当前时间
  const now = new Date().getTime();
  
  // 10分钟后
  const tenMinutesLater = now + 10 * 60 * 1000;
  
  // 30分钟后
  const thirtyMinutesLater = now + 30 * 60 * 1000;
  
  // 1小时前
  const oneHourBefore = now - 60 * 60 * 1000;
  
  return [
    {
      id: '1',
      name: 'Apple iPhone 15 Pro 256GB 钛金属版',
      description: '搭载 A17 Pro 芯片，采用钛金属材质，轻盈坚固。4800万像素主摄，5倍光学变焦，超视网膜 XDR 显示屏，支持全天候显示。',
      image: 'https://images.pexels.com/photos/19239763/pexels-photo-19239763/free-photo-of-camera-on-iphone-15-pro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      originalPrice: 9999,
      flashPrice: 8799,
      stock: 45,
      totalStock: 100,
      status: 'active',
      startTime: oneHourBefore
    },
    {
      id: '2',
      name: 'Nintendo Switch OLED 白色游戏主机',
      description: '7英寸OLED屏幕，鲜艳的色彩，清晰的对比度，可调节支架，有线LAN端口，64GB内部存储，增强音频。',
      image: 'https://images.pexels.com/photos/12719053/pexels-photo-12719053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      originalPrice: 2499,
      flashPrice: 1999,
      stock: 0,
      totalStock: 50,
      status: 'active',
      startTime: oneHourBefore
    },
    {
      id: '3',
      name: 'Sony WH-1000XM5 无线降噪耳机',
      description: '采用全新V1处理器的行业领先降噪技术，40mm驱动单元，高清音质，30小时续航，多点连接，语音助手支持。',
      image: 'https://images.pexels.com/photos/12657323/pexels-photo-12657323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      originalPrice: 2999,
      flashPrice: 2399,
      stock: 20,
      totalStock: 50,
      status: 'active',
      startTime: oneHourBefore
    },
    {
      id: '4',
      name: 'MacBook Pro 14英寸 M3 Pro芯片',
      description: '搭载M3 Pro芯片，12核CPU，18核GPU，14英寸Liquid视网膜XDR显示屏，最高18小时续航，MagSafe充电，空间音频。',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      originalPrice: 14999,
      flashPrice: 13299,
      stock: 10,
      totalStock: 30,
      status: 'upcoming',
      startTime: tenMinutesLater
    },
    {
      id: '5',
      name: 'Samsung Galaxy S23 Ultra 512GB',
      description: '200MP超高清主摄，10倍光学变焦，骁龙8 Gen 2处理器，6.8英寸动态AMOLED 2X屏幕，S Pen触控笔，5000mAh电池。',
      image: 'https://images.pexels.com/photos/16975618/pexels-photo-16975618/free-photo-of-close-up-of-a-samsung-galaxy-s23-ultra.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      originalPrice: 9499,
      flashPrice: 8399,
      stock: 15,
      totalStock: 40,
      status: 'upcoming',
      startTime: thirtyMinutesLater
    },
    {
      id: '6',
      name: 'Dyson V12 Detect Slim 无线吸尘器',
      description: '革命性激光颗粒检测技术，LCD显示屏，自动感应吸力调节，60分钟续航，HEPA过滤，无需接触尘杯清空。',
      image: 'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      originalPrice: 4590,
      flashPrice: 3799,
      stock: 0,
      totalStock: 30,
      status: 'ended',
      startTime: oneHourBefore
    }
  ];
};

// 模拟商品列表
const mockProducts = generateProducts();

// 获取秒杀商品列表
export const getFlashSaleProducts = async (): Promise<Product[]> => {
  await delay(800);
  return mockProducts;
};

// 获取单个商品详情
export const getProductDetail = async (id: string): Promise<Product> => {
  await delay(600);
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    throw new Error('商品不存在');
  }
  
  return product;
};

// 模拟提交订单
export const submitOrder = async (productId: string): Promise<{ success: boolean; orderId: string }> => {
  await delay(1000);
  
  const orderId = `ORDER${Date.now()}`;
  
  return {
    success: true,
    orderId
  };
};