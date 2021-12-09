<template>
  <div>

    <h1 class="titulo">{{ titulo }}</h1>

    <input type="search" class="filtro" v-on:input = "filtro = $event.target.value" placeholder="filtre pelo título da foto">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.titulo">

        <meu-painel :titulo="foto.titulo">
          <!-- componente imagem-responsiva com data-binding para assegurar mudança de propriedade -->
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo"/>
            <!--modifier nativo no @click para realozar o método no componente que não foi programado para isso -->
          <!--<meu-botao tipo="button" rotulo="REMOVER" @click.native="remove(foto)"/>-->
          <meu-botao tipo="button" rotulo="REMOVER" @botaoAtivado="remove(foto)"/>
        </meu-painel>

      </li>
    </ul>

  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';

export default{

  components: {
    'meu-painel' : Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao' : Botao
  },

  data() {

    return {
      titulo: 'Galeria de Fotos',
      fotos: [],
      filtro: ''
    }
  },
  
//Não há um valor registrado na propriedade, 
// e sim uma função getter que pode ou não busca o valor desejado em outros lugares.
  computed: {
     
    fotosComFiltro() {

      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }

    }
  },
//declarar metódos que posso chamar 
//à partir da interação dos componentes da página
  methods: {
    // metodo remove deve receber a foto para excluir
    
    remove(foto){
            
        alert('Remover a foto'+ foto.titulo);
    }
            

},

  created() {
    
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos);
  }

}
</script>

<style>
  .titulo {
      text-align: center;
  }


  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  .imagem-responsiva {
    width: 100%;
  }

   .filtro {
    display: block;
    width: 100%;
  }


</style>

