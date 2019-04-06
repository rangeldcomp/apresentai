
const AdicionarUser = require('./DAOCadastroUser').AdicionarUser


function Cadastro(nome,email,senha,login){

    if(AdicionarUser(nome,email,senha,login)){

        console.log("usuario cadastrado")
    }else{
        console.log("fudeo")
    }

}


module.exports = {Cadastro : Cadastro}
