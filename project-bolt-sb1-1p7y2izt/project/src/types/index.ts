// 商品状态
export type SaleStatus = 'upcoming' | 'active' | 'ended';

// 商品信息
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  originalPrice: number;
  flashPrice: number;
  stock: number;
  totalStock: number;
  status: SaleStatus;
  startTime: number; // 活动开始时间戳
}