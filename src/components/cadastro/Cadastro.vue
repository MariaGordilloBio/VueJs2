
<template>
<!-- Associação de cada campo do formulário com uma propriedade do obj foto  -->
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <!--<h2 class="centralizado">{{foto.titulo}}</h2> -->
    <!-- Usar diretiva v-on (@) para observar elementos do DOM -->
    <!-- modifier equivalente ao preventDefault que cancela padraão do comportamento - impede recarrefar - SPA-->
    <form @submit.prevent="grava()">
    <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input v-model.lazy = "foto.titulo" id="titulo" autocomplete="off">
      </div>

      <div class="controle">
        <label for="url">URL</label>
    <!-- modificador lazy - a diretiva só "pegará" info quando quando o campo for enviado - não um caractere por vez - após o evento change-->
        <input v-model.lazy = "foto.url" id="url" autocomplete="off">
    <!-- imagem respondiva recebe por v-bind as informações que precisa para renderizar -->
    <!-- v-show é semelhante à v-if - exibe ou oculta elemento de acordo com condição - muda estilo css do elemento para none -->
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea v-model = "foto.descricao" id="descricao" autocomplete="off" ></textarea>
      </div>
    <!-- two way data binding: v-bind - da view para fonte de dados e :value - da fonte de dados para view { v-model é diretiva que cria interligações de mão dupla}--> 
      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
    <!--Clique no botão gera navegação para home -->        
        <router-link to="/"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },
    data() {
        return {

        foto: {
            titulo: '',
            url: '', 
            descricao: ''
        }
        }
    },
// Cria método para teste dos dados gravados pelo formulário    
    methods: {

    grava() {

      console.log(this.foto);
      // mostra no console as prop gravadas no obj foto

      this.foto = {
          titulo: '',
          url: '',
          descricao: ''
      };
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

</style>