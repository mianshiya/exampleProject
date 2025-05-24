/**
 * 事件总线实现
 * 用于组件间的消息传递
 */
type EventCallback = (data: any) => void;

class EventBus {
  private events: Map<string, EventCallback[]>;

  constructor() {
    this.events = new Map();
  }

  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 事件回调函数
   */
  on(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)?.push(callback);
  }

  /**
   * 发布事件
   * @param event 事件名称
   * @param data 事件数据
   */
  emit(event: string, data: any): void {
    if (this.events.has(event)) {
      this.events.get(event)?.forEach(callback => callback(data));
    }
  }

  /**
   * 取消订阅事件
   * @param event 事件名称
   * @param callback 事件回调函数（可选，不传则取消该事件的所有订阅）
   */
  off(event: string, callback?: EventCallback): void {
    if (!callback) {
      this.events.delete(event);
      return;
    }

    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
      if (callbacks.length === 0) {
        this.events.delete(event);
      }
    }
  }
}

// 创建单例实例
const eventBus = new EventBus();
export default eventBus;