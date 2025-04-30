import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ModalPlugin from './components/modal'

const app = createApp(App)

// 注册Modal组件为全局组件
app.use(ModalPlugin)

app.mount('#app')