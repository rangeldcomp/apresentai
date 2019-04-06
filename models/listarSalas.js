const get_users = require('./DAOCadastroUser').get_users

function ListarSalas(){
    try {
        const resultado = get_users.apply(null);
       // console.log();
        return resultado.resolve("salas")


} catch (err) { console.log("fala fiote") }
}

module.exports = {ListarSalas : ListarSalas}