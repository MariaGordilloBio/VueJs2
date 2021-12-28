import Vue from 'vue';
import App from "C:/Users/mgordillo/Desktop/EstudosBio/VueJs/alurapic/src/App.vue";
//módulo VueResource adiciona no global view object o objeto $http 
//que possui um método para cada método suportado pelo HTTP
import VueResource from 'vue-resource';
//nos permite centralizar o domínio da nossa API em um único 
//local evitando assim que tenhamos de informá-lo toda vez que formos acessar nossa API.
import VueRouter from 'vue-router';
import {routes} from './routes';
//disponibiliza artefatos especializados na realização 
//de requisições assíncronas 
//ao mesmo tempo em que se integra com o ecossistema do Vue.

Vue.use(VueRouter);
//módulos criados precisam ser importados
import './directives/Transform';
//criar router para que VueRouter 
//receba as routes e retorne a rota associada às propriedades
//cria new instance
const router = new VueRouter({
  routes, 
  mode: 'history'
});

Vue.use(VueResource);

// http usará sempre o endereço abaixo
// O valor passado para a propriedade root será a raiz de toda 
//requisição que fizermos através de VueResource e seus artefatos como $http.

Vue.http.options.root = 'http://localhost:3000';

//view instance -- acessível a toda aplicação
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

