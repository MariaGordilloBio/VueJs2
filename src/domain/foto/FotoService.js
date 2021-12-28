//classe especializada em consumir nossa API
export default class FotoService {

    constructor(resource) { 
    //recebe em seu construtor um resource, o this.$resource do componente que utilizará o serviço    

        this._resource = resource('v1/fotos{/id}');
    // internamente na propriedade this._resource guardamos um instância configurada.    
    }

    cadastra(foto) {

        /* Se o objeto foto passado como parâmetro tiver a propriedade _id 
        é porque está sendo alterado, se não tiver, é porque ele nunca foi gravado 
        no banco e precisa ser incluído através da API */

        if(foto._id) {

            return this._resource.update({ id: foto._id }, foto);

        } else {

            return this._resource.save(foto);
        }

    }


    lista() {

        return this._resource
          .query()
 // Se ocorre um erro, envia mensagem pleo console e na página para usuário         
          .then( //função then que realizamos a conversão dos dados para json
            res => res.json(),
            err => {
              console.log(err);
              throw new Error('Não foi possível obter as fotos. Tente novamente mais tarde');
          }
    
        )
    }
 
    apaga(id) {
//operação de deleção não nos devolve nenhum dado,  null para then e em seguida passa o callback de erro
        return this._resource
            .delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover a foto. Tente mais tarde');
            });
    }


    busca(id) {
//recebe o ID da foto e nos devolve uma promise que nos fornecerá o objeto foto trazido de nossa API
        return this._resource
            .get({ id })
            .then(res => res.json());
    }
}