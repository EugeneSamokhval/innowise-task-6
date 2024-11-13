import './assets/main.css'
import { firebaseConfig } from './firebase-config.env'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
initializeApp(firebaseConfig)
const app = createApp(App)

app.use(router)

app.mount('#app')
