
<template>
<!-- Associação de cada campo do formulário com uma propriedade do obj foto -> muda-se para classe Foto  -->
  <div>
    <!-- Se o id da foto for preenchido, é uma alteração. Caso não, representa a adição de uma nova foto-->
    <h1 v-if="foto._id" class="centralizado">Alteração</h1>
    <h1 v-else class="centralizado">Inclusão</h1>
    <!--<h2 class="centralizado">{{foto.titulo}}</h2> -->

    <!-- Usar diretiva v-on (@) para observar elementos do DOM -->
    <!-- modifier equivalente ao preventDefault que cancela padraão do comportamento - impede recarrefar - SPA-->
    <form @submit.prevent="grava()">
    <div class="controle">
        <label for="titulo">TÍTULO</label>
    <!-- validação dos campos com VeeValidate --> 
        <input name = "titulo" v-model = "foto.titulo" id="titulo" autocomplete="off" v-validate data-vv-rules="required|min:3|max:30" data-vv-as="título">
        <span class="erro"  v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span> <!-- apresentar o erro ao usuário -->
    <!-- v-show mostra erro somente quando existe. O object erros é criado 
    automaticamente pelo VeeValidate e através do método has 
    consulta se um input(name-identifica) falhou na validação. -->
    </div>
      <div class="controle">
        <label for="url">URL</label>
    <!-- modificador lazy - a diretiva só "pegará" info quando quando o campo for enviado - não um caractere por vez - após o evento change-->
        <input name = "url" v-model= "foto.url" id="url" autocomplete="off" v-validate data-vv-rules="required">
    <!-- imagem respondiva recebe por v-bind as informações que precisa para renderizar -->
    <!-- v-show é semelhante à v-if - exibe ou oculta elemento de acordo com condição - muda estilo css do elemento para none -->
        <span class="erro" v-show="errors.has('url')">{{ errors.first('url') }}</span>
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea v-model = "foto.descricao" id="descricao" autocomplete="off" ></textarea>
      </div>
    <!-- two way data binding: v-bind - da view para fonte de dados e :value - da fonte de dados para view { v-model é diretiva que cria interligações de mão dupla}--> 
      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>

    <!--Clique no botão gera navegação para home -       
        <router-link to="/"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>  --> 

        <router-link :to="{name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
    <!-- to faz data binding com com router global para buscar rota, pelo valor do obj js com a propriedade name(nome da rota) -->
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
// importando a classe Foto
import Foto from '../../domain/foto/Foto.js';
//importando classe FotoService
import FotoService from '../../domain/foto/FotoService';



export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },
    data() {
        return {
//importa classe usando suas instancias evitando ter que definir em Cadastro a estrutura de um objeto foto
        foto: new Foto(),
        id: this.$route.params.id //propriedade id como propriedade do objeto retornado pela função data
//$route.params concede acesso ao parametro(id) pela rota
        }
    },
    
    methods: {

        grava() {
// Cria método para teste dos dados gravados pelo formulário
            /*console.log(this.foto);  -- mostra no console as prop gravadas no obj foto */

      /*this.foto = {
          titulo: '',
          url: '',
          descricao: '' */

           /* this.resource
     o método save realiza um POST por debaixo dos panos enviado os dados passado como parâmetro            
                .save(this.foto)
                .then(() => this.foto = new Foto(), err => console.log(err));    */

//método para conferir se o dado é inválido
             this.$validator
/*VueValidator permite acesso ao obj $validator - método validateAll faz um procedimento disparando a validação de cada campo.
Seu retorno é uma promise que devolve um boolean. Se for verdadeiro, é porque todos os campos passaram na validação. */            
                .validateAll()
                .then(success => {
                if(success) {


            this.service
                .cadastra(this.foto)
                .then(() => {
// Se a foto a ser alterada possui id,após sua alteração usuário é levado à home
                if(this.id) this.$router.push({ name: 'home'});
                this.foto = new Foto()
                }, 
                err => console.log(err)); //apresenta o erro no console
            }

         });

      }
    },

    created() {
/* método created para configurarmos nosso resource
    this.resource = this.$resource('v1/fotos{/id}'); */

     this.service = new FotoService(this.$resource);

     if(this.id) {
//testa se id possui valor,         
      this.service
        .busca(this.id)
        .then(foto => this.foto = foto);
    }
  }

}




</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .erro {
    color: red;
  }
</style>