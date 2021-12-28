// classe para criar um model para criar instâncias de Foto 

export default class Foto {
// o módulo Foto.js exporta por padrão a classe foto

    constructor(titulo='', url='', descricao='') {
//construtor que recebe três parâmetros e caso eles não sejam passados será utilizado uma string vazia como valor padrão.
        this.titulo = titulo;
        this.url = url;
        this.descricao = descricao;
    }
}