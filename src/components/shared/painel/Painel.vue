<template>

  <div class="painel">
    <!-- atalho de v-on: @ -->
    <h2 class="painel-titulo" v-on:dblclick="visivel = !visivel">{{ titulo }}</h2>
    <!-- transition informa vue a adicionar classes especiais na ttansição do c
    componente -->
    <transition name="painel-fade">
    <!-- slot mantém informações como um acumulador de fichas,
        recebendo e mantendo o conteúdo da tag 
        v-show capta transição quando a condição muda-->
        <div class="painel-conteudo" v-show="visivel">
            <slot></slot>
        </div>
    </transition>
    
  </div> 

</template>

<script>

export default {
   props: ['titulo'],

   data() {

       return{
           visivel :true
       }
   }
}
</script>
<!--  Definir o escopo da estilização apenas para aquele componente -->
<style scoped>
 .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  * colocando todos os elementos do painel com box shadow */

  * especificando seletor, se colocar apenas * pega toda pag */

  .painel * {
    box-shadow: 5px 5px 5px;
  }

  .painel-fade-enter, .painel-fade-leave-active{
    opacity: 0;
  }

  .painel-fade-enter-active, .painel-fade-leave-active{
    transition: opacity .4s;
  }

  .painel-conteudo {
    overflow: hidden;
  }
  
</style>