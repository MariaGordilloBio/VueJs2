import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import {routes} from './routes';
//disponibiliza artefatos especializados na realização 
//de requisições assíncronas 
//ao mesmo tempo em que se integra com o ecossistema do Vue.
Vue.use(VueResource);
Vue.use(VueRouter);
//criar router para que VueRouter 
//receba as routes e retorne a rota associada às propriedades
//cria new instance
const router = new VueRouter({
  routes, 
  mode: 'history'
});


//view instance -- acessível a toda aplicação
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

