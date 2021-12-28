import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';
/*configuração das rotas, carregando componentes à 
partir da importação do componentes para cada uma delas */
export const routes = [
    //rota é obj js com 2 propriedades
    { path: '', name: 'home', component: Home, titulo: 'Home', menu: true },
    { path: '/cadastro', name:'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true },
    { path: '/cadastro/:id', name:'altera', component: Cadastro, titulo: 'Cadastro', menu: false }, // :NomeDoParametro para parametrizar uma rota.
    //navegação para home pelo curinga * caso o acesso não ocorra por uma das rotas acima
    { path: '*', component: Home, menu: false }
];

/* dar  nome para as rotas e referenciarmos este nome em todos os lugares que precisamos gerar uma navegação -
A vantagem disso é que se o path da rota mudar, o restante da nossa aplicação não será afetado. */