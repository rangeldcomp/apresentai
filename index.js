const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./config/auth')(passport)
const {isLogado} = require('./helpers/isLogado')

// Conexão com o Banco
const cadastro = require('./models/addUsers').Cadastro
const listarsalas = require('./models/listarSalas').ListarSalas

const DAOUsuario = require('./models/DAOUsuario')
const DAOSala = require('./models/DAOSala')

//Sessão
app.use(session({
    secret: "apresentai",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

//Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Carregando arquivos de estilos e scripts
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.send("Olá")
})

//Rotas
app.get("/login", function(req, res) {
    res.render('login')
})

app.post("/login", (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/navegate/facade",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
})

app.get("/navegate/facade", isLogado, (req, res) => {
    // ----- ADICIONA ISSO -----
    DAOUsuario.GetUsuarioById.apply(null, [req.user])
        .then(usuario => {
            res.render('navegate/facade', {get: usuario})
        })
})

app.get("/navegate/busca", isLogado, (req, res) => {
    res.render('navegate/busca')
})

app.get("/navegate/formulario", isLogado, (req, res) => {
    res.render('navegate/formulario')
})

app.get("/navegate/list_salas", isLogado, (req, res) => {
    DAOUsuario.GetSalasCriadasById.apply(null, [req.user])
        .then(salas => {
            res.render('navegate/list_salas', {post: salas})
        })
})

app.get("/navegate/list_salas_participadas", isLogado, (req, res) => {
    DAOUsuario.GetSalasParticipadasById.apply(null, [req.user])
        .then(salas => {
            res.render('navegate/list_salas_participadas', {post: salas})
        })
})

app.post('/navegate/open_sala',function(req,res){ // quero renderizar a label sala_equipes e não consigo 
    const text = '{ "salas" : [{ "nome":"CHANDLER BING", "email":"chandler.bing@hotmail.com", "login":"bing"},{ "nome":"JOEY TRIBBIANI", "email":"joey@gmail.com", "login":"drake_ramoray"},{ "nome":"MONICA GELLER", "email":"monica.geller@outlook.com", "login":"chef_monica"},{ "nome":"ROSS GELLER", "email":"ross.geller@gmail.com", "login":"dr_ross"},{ "nome":"RACHEL GREEN", "email":"rachel.green@ralphlauren.com", "login":"rachel_green"},{ "nome":"PHOEBE BUFFAY", "email":"buffay.phoebe@hotmail.com", "login":"smelly_cat"},{ "nome":"neto", "email":"neto@gmail.com", "login":"nelson"},{ "nome":"neto", "email":"eu", "login":"ele"},{ "nome":"asdas", "email":"sadasdas", "login":"asdasd"},{ "nome":"hermanio", "email":"ernadio@gmail.com", "login":"los_hermanios"},{ "nome":"hermanio", "email":"ernadio@gmail.com", "login":"los_hermanios"},{ "nome":"caio", "email":"curisco@hotmail", "login":"caio"},{ "nome":"nelson", "email":"nelson@gmail.com", "login":"nelsinho"},{ "nome":"nelson", "email":"mandela@gmail.com", "login":"mandela"}]}'
    const test =  JSON.parse(text);
    console.log(test)

    res.render('navegate/sala_equipes', {post: test.salas})
})

// Cadastro
app.get('/cad', function(req,res){
    res.render('form_cadastro')
})

app.post('/cad',function(req,res){
    cadastro(req.body.nome,req.body.email,req.body.senha,req.body.login)
    req.flash("error_msg", 'Cadastro Realizado com sucesso')
    res.redirect("/login")
})

app.get("/logout", (req, res) => {
    req.logOut()
    req.flash("success_msg", "Deslogado com sucesso!")
    res.redirect("/login")
})

//Alguns testes
/*app.get("/erro", (req, res) => {
    res.render('erro')
})*/

/*app.get("/sucesso", (req, res) => {
    DAOSala.GetComponentesByEquipe.apply(null, [1])
        .then(usuarios => {
            res.locals.test = usuarios
        })
    res.render('sucesso')
})*/

app.listen(8080, function(){
    console.log("Servidor Rodando!")
})