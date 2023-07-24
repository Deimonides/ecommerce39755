
export const authAdmin = (req, res, next) => { // only admins
    if (req.session.user && req.session.user.role == 'admin') return next()
    return res.status(401).render('login', {mensaje: '🚫 Inicie sesión como Administrador.'})
}
export const authUser = (req, res, next) => { // any logged user
    if (req.session.user) return next()
    return res.status(401).render('login', {mensaje: '🚫 Inicie sesión.'})
}
