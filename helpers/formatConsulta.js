module.exports = {
    formatConsulta: (consulta) => {
        let idequipe, nome_equipe, result;
        result = `[ `;
        consulta.forEach(elem => {
            if(elem.idequipe != idequipe){
                if(idequipe != null) result += `]},
                `;

                idequipe = elem.idequipe
                nome_equipe = elem.nome_equipe
                
                result += `{"id_equipe": ${idequipe}, 
                        "nome_equipe": "${nome_equipe}",
                        "componentes": [`;
            }
            else{
                result += `,`
            }
            result += `{"iduser": ${elem.iduser}, "nomeuser": "${elem.nomeuser}"}`
        })
        result += `]}]`

        return JSON.parse(result)
    }
}