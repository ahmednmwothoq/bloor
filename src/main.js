import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './store/i18n'
import router from './router'
import PusherPlugin from './store/pusher'

import Toast from "vue-toastification";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


import "vue-toastification/dist/index.css";
import './assets/main.css'

const apiKey = '79cdc12e4ed7523f2b6d'

const app = createApp(App)
app.component('QuillEditor', QuillEditor)
app.use(PusherPlugin, { apiKey, cluster: 'eu' })
app.use(Toast)
app.use(i18n)
app.use(router)
app.use(store)
app.mount('#app')
