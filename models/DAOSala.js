const pool = require('./bd').pool

async function GetEquipesBySala(idSala) {
    try {
        const consulta = `
            SELECT eq_comp.nome AS nome_eq
            FROM bd_apresentai.tb_usuario AS usuario
            INNER JOIN (bd_apresentai.tb_componentes AS comp
                    INNER JOIN bd_apresentai.tb_equipe AS equipe
                    ON comp.equipe_idequipe = equipe.idequipe) AS eq_comp
            ON usuario.iduser = eq_comp.usuario_idusuario
            WHERE eq_comp.sala_idsala = $1
            GROUP BY eq_comp.nome;
        `;
        const valor = [idSala]

        let res = await pool.query(consulta, valor)

        if(res.rows[0] != null)
            return res.rows

        return false
    }
    catch(e){
        console.error("Erro ao tentar realizar a busca! " + e)
    }
}

async function GetComponentesByEquipe(idEquipe){
    try{
        const consulta = `
            SELECT usuario.nome AS nome_usuario, usuario.login AS username 
            FROM bd_apresentai.tb_usuario AS usuario 
            INNER JOIN (bd_apresentai.tb_componentes AS comp 
                INNER JOIN bd_apresentai.tb_equipe AS equipe 
                ON comp.equipe_idequipe = equipe.idequipe) AS eq_comp 
            ON usuario.iduser = eq_comp.usuario_idusuario
            WHERE eq_comp.idequipe = $1;
        `;

        const valor = [idEquipe]

        let res = await pool.query(consulta, valor)

        if(res.rows[0] != null)
            return res.rows

        return false
    }
    catch(e){
        console.error("Não foi possível realizar a busca dos componentes da equipe! " + e)
    }
}

module.exports = {
    GetComponentesByEquipe: GetComponentesByEquipe,
    GetEquipesBySala: GetEquipesBySala
}




