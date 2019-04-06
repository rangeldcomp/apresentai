const bd = require('./bd')

async function get_users(){
    let res = await bd.pool.query(
        'SELECT * FROM bd_apresentai.tb_usuario')
    res.rows.forEach(user => {
        console.log('Nome: ' + user.nome)
        console.log('Login: ' + user.login)
        console.log('E-mail: ' + user.email)
        console.log('======================================')
    })
}

async function ChecarUser(login, senha){
    try{
        const consulta = 'SELECT * ' 
                        + 'FROM bd_apresentai.tb_usuario '
                        + 'WHERE login = $1 AND senha = $2'
        const valores = [login, senha]

        let res = await bd.pool.query(consulta, valores)

        if(res.rows[0] != null){
            return res.rows[0];
        }

        return false;
    }
    catch(e){
        console.error('Usuario não encontrado!! ' + e)
    }
}

module.exports = {
    get_users: get_users,
    ChecarUser: ChecarUser
}
