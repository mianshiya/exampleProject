import Modal from './Modal.vue';
import { App } from 'vue';

export { Modal };

// 用于插件安装
export default {
  install(app: App) {
    app.component('Modal', Modal);
  }
};