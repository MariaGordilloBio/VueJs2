import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';
//configuração das rotas, carregando componentes à 
//partir da importação do componentes para cada uma delas
export const routes = [
    //rota é obj js com 2 propriedades
    { path: '', component: Home, titulo: 'Home' },
    { path: '/cadastro', component: Cadastro, titulo: 'Cadastro' }
];
