<template>
  <div>

    <h1 class="titulo">{{ titulo }}</h1>

    <!-- novo elemento para exibir mensagens para o usuário -->
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input type="search" class="filtro" v-on:input = "filtro = $event.target.value" placeholder="filtre pelo título da foto">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.titulo">

        <meu-painel :titulo="foto.titulo">
            <!-- componente imagem-responsiva com data-binding para assegurar mudança de propriedade 
            Usar modificador para parâmetro de controlar animação -  indicam que diretiva deve ser usada
            de maneira especial(.)
            Usar argumentos quando utilizando vários mdificadores -  rotate será efeito padrão quando nenhum argument for passado-->
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-meu-transform:scale.animate="1.2"/>
          <!-- Aplica diretriz para modificar DOM no elemento escolhido (el) -->
          <!--modifier nativo no @click para realozar o método no componente que não foi programado para isso -->
          <!--<meu-botao tipo="button" rotulo="REMOVER" @click.native="remove(foto)"/>-->
          <!-- novo botão! -->

          <router-link :to="{ name: 'altera', params: { id : foto._id }}">
          <!--navegação para cadastro passando como parâmetro o ID da foto -->
          <!-- obj objeto passado para a propriedade to agora possui a propriedade params - nome exato curinga usado na rota -->
            <meu-botao 
                rotulo="Alterar" 
                tipo="button"/>
          </router-link>  
          <meu-botao 
          tipo="button" 
          rotulo="REMOVER"
          estilo="perigo"
          :confirmacao="true"  
          @botaoAtivado="remove(foto)"/>
        </meu-painel>

      </li>
    </ul>

  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
// importou  diretiva. Tem que adicionar na propriedade directives logo abaixo!
//import transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';


export default{
  components: {
    'meu-painel' : Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao' : Botao
  },
  //directives: {
    //'meu-transform': transform
//possível dar diferentes "apelidos" para a adiretiva    
  //},
  data() {
    return {
      titulo: 'Galeria de Fotos',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },
  
//Não há um valor registrado na propriedade, 
// e sim uma função getter que pode ou não buscar o valor desejado em outros lugares.
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

    remove(foto) {
      
      //// a chave do objeto é o parâmetro usando no endereço do recurso 
      
      //this.resource({id: foto._id}) - funcionalidade passa para classe -FotoService- que cuidará do consumo à API
        this.service
        .apaga(foto._id)
        .then(
          () => {
             let indice = this.fotos.indexOf(foto); 
            // acha a posição da foto na lista
             this.fotos.splice(indice, 1); // a instrução altera o array - remove item do array
            // assim que apagar, exibe a mensagem para o usuário
             this.mensagem = 'Foto removida com sucesso'
            //sincronia entre o estado das fotos no servidor com o estado das fotos no cliente - data binding 
          }, 
          err => this.mensagem = err.message
        
        )
    }

  },
  created() {
    /* Utilizando $http para requisições do tipo AJAX
    this.$http.get('v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
    */  

    /* agora conseguimos acessar o recurso configurado em outros métodos do nosso componente
     se o parametro foto não for passado, será ignorado
    Adicionamos parâmetro em recursos através de {/nomeDoParametro}
    this.resource = this.$resource('v1/fotos{/id}'); //recurso configurado para um endereço - Classe de API - FotoService */

    // criando uma instância do nosso serviço que depende de $resource
    this.service = new FotoService(this.$resource);


    /* this.resource
      .query() //método query faz uma requisição do tipo GET para v1/fotos
      //quem chama o método query não precisa saber o detalhe do endereço
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err)); */

      this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);
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
