//importação do global view object Vue
//através dele que registraremos nossa diretiva para que seja acessível pelas views da nossa aplicação
import Vue from 'vue';

//criar uma diretiva globalmente(Vue.directive) - modifica o DOM - rotacionar página

Vue.directive('meu-transform', {
//para usar a diretiva será necessário utilizar v-meu-transform
//hook function: bind function - chamada quando diretiva é primeiro ligada ao elemento

//O módulo Transform agora exporta um objeto que contém as configurações da nossa diretiva. - nome da diretiva dado na importação

    bind(el, binding, vnode) {
//el: o elemento o qual a ligação é feita(no DOM)
//binding: o elemento que contem os argumentos passados para o hooks
//vnode: permite referenciar diretamente ao DOM virtual usaado no Vue
        let current = 0;
//guardar eixo atual para rotacionar
        el.addEventListener('dblclick', function(){
            //ter acesso ao valor atribuído ao binding.value - sem  parâmetro, usa 90 como padrão
            let incremento = binding.value || 90;
            let efeito;
            //let animate = false; - usando modificador essa linha fica inutilizável
            if(!binding.arg || binding.arg == 'rotate'){
            // Se nenhum argumento for passado, rotate será o padrão -- argumentos utilizam modificadores para mudar a logica da diretiva
            //adição de modificador para imagem girar em sentido contrário
                if(binding.modifiers.reverse) {
                    current-=incremento;
                } else {
                    current+=incremento;
                }
                efeito = `rotate(${current}deg)`;

            } else if (binding.arg == 'scale') {
            // condição de escala da imagem        
                efeito = `scale(${incremento})`;
            }
            el.style.transform = efeito;

            if (binding.modifiers.animate)
            el.style.transition = "transform 0.5s";
           
//template string - transformação CSS via DOM diretamente            
        });
//a cada 2 cliques, rotacionará 90 graus -> el é elemento do DOM - pode usar método em js puro

    }


});


