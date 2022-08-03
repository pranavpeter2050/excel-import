require('./bootstrap')

import { createApp } from 'vue'
import HelloWorld from './components/Welcome'
import FileImport from './components/FileImport'

const app = createApp({})

app.component('hello-world', HelloWorld)
// app.component('file-import', FileImport)
app.component('file-upload-component', require('./components/FileImport.vue').default);

app.mount('#app')
