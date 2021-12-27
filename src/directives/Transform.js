//importação do global view object Vue
//através dele que registraremos nossa diretiva para que seja acessível pelas views da nossa aplicação
import Vue from 'vue';

//criar uma diretiva globalmente(Vue.directive) - modifica o DOM - rotacionar página

Vue.directive('meu-transform', {
//para usar a diretiva será necessário utilizar v-meu-transform
//hook function: bind function - chamada quando diretiva é primeiro ligada ao elemento

    bind(el, binding, vnode) {
//el: o elemento o qual a ligação é feita(no DOM)
//binding: o elemento que contem os argumentos passados para o hooks
//vnode: permite referenciar diretamente ao DOM
        let current = 0;
//guardar eixo atual para rotacionar
        el.addEventListener('dblclick', function(){
            //let incremento = binding.value || 90; //ter acesso ao valor atribuído ao binding.value - sem  parâmetro, usa 90 como padrão
            let incremento = 90;
            let animate = false;
            current+=incremento;
            this.style.transition = "transform 0.5s";
            this.style.transform = `rotate(${current}deg)`;
//template string - transformação CSS via DOM diretamente            
        });
//a cada 2 cliques, rotacionará 90 graus -> el é elemento do DOM - pode usar método em js puro

    }



});