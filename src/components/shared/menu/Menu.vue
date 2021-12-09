<template>
<nav>
      <ul>       
          <li v-for="rota in rotas" :key="rota">
            <router-link :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link>
          </li>
      </ul>
    </nav>
</template>

<script>
export default {
    //também pode-se fazer 
    //uma validação na rota por meio de um obj js e suas propriedades
    props: {
        rotas: {
            type: Array,
            required: true
        }
    }
}

</script>

<style>

</style>