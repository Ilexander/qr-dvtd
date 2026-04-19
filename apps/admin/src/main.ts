import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'

import '@qr/ui/src/style.css'

createApp(App)
  .use(VueQueryPlugin)
  .mount('#app')
