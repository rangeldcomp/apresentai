const localStrategy = require('passport-local').Strategy
const ChecarUser = require('../models/DAOCadastroUser').ChecarUser
//const bcrypt = require('bcrypt')

module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'username'}, (username, senha, done) => {
        ChecarUser.apply(null, [username, senha])
            .then((usuario) => {
                
                if(usuario == false){
                    return done(null, true, {message: "Esta conta não existe"})
                } 
                else{
                    return done(null, usuario)
                }

                /*bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                    if(batem){
                        return done(null, usuario)
                    }
                    else{
                        return done(null, false, {message: "Senha incorreta"})
                    }
                })*/
            })
        }))

    passport.serializeUser((usuario, done) => {
        if(usuario != false){
            done(null, usuario.iduser)
        }
    })

    passport.deserializeUser((id, done) => {
        done(null, id)
    })
}