import './assets/main.css'
import { firebaseConfig } from './firebase-config.env'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const app = createApp(App)

app.use(router)

app.mount('#app')

export { db }
