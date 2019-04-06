const pool = require('./bd').pool

async function GetUsuarioById(idUser){
    try {
        const consulta = `
            SELECT * 
            FROM bd_apresentai.tb_usuario
            WHERE iduser = $1;
        `;

        const valor = [idUser]

        let res = await pool.query(consulta, valor)

        if(res.rows[0] != null)
            return res.rows

        return false
    } 
    catch (error) {
        console.error("Não foi possível encontrar o usuário! " + error)
    }
}

async function GetSalasCriadasById(idUser){
    try {
        const consulta = `
            SELECT sala.idsala, sala.nomesala
            FROM bd_apresentai.tb_usuario AS usuario
            INNER JOIN bd_apresentai.tb_sala AS sala
            ON usuario.iduser = sala.adm
            WHERE usuario.iduser = $1;
        `;

        const valor = [idUser]

        let res = await pool.query(consulta, valor)

        if(res.rows[0] != null)
            return res.rows

        return false
    }
    catch (error) {
        console.error("Não possível encontrar salas criadas por este usuário! " + error)
    }
}

async function GetSalasParticipadasById(idUser){
    try {
        const consulta = `
            SELECT comp_eq_sala.idsala, comp_eq_sala.nomesala 
            FROM bd_apresentai.tb_usuario AS usuario
            INNER JOIN (bd_apresentai.tb_componentes AS comp
                INNER JOIN (bd_apresentai.tb_equipe AS equipe
                    INNER JOIN bd_apresentai.tb_sala AS sala
                    ON equipe.sala_idsala = sala.idsala) AS eq_sala
                ON comp.equipe_idequipe = eq_sala.idequipe) AS comp_eq_sala
            ON usuario.iduser = comp_eq_sala.usuario_idusuario
            WHERE usuario.iduser = $1;
        `;

        const valor = [idUser]

        let res = await pool.query(consulta, valor)

        if(res.rows[0] != null)
            return res.rows

        return false
    }
    catch (error) {
        console.error("Não foi possível encontrar salas em que este usuário esteja participando! " + error)
    }
}

module.exports = {
    GetUsuarioById: GetUsuarioById,
    GetSalasCriadasById: GetSalasCriadasById,
    GetSalasParticipadasById: GetSalasParticipadasById
}