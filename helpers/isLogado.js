module.exports = {
    isLogado: (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        }

        req.flash("error_msg", "você deve estar logado para ter acesso a essa página!")
        res.redirect("/login")
    }
}