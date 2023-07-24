import { Router } from 'express'
import productModel from '../dao/models/product.model.js'
import { authAdmin, authUser } from '../config/auth.middleware.js'
import { read, readById, create, updateById, deleteById } from '../controllers/products.controller.js'

const router = Router()

// VALIDACION POR ROL DE SESION ********************************************
    // const authAdmin = (req, res, next) => { // only admins
    //     if (req.session.user && req.session.user.role == 'admin') return next()
    //     // console.log("🚀 ~ file: products.router.js:12 ~ authAdmin ~ req.session.user:", req.session.user)
    //     // console.log("🚀 ~ file: products.router.js:12 ~ authAdmin ~ req.session.user.role:", req.session.user.role)
    //     return res.status(401).render('login', {mensaje: '🚫 Inicie sesión como Administrador.'})
    // }
    // const authUser = (req, res, next) => { // any logged user
    //     // if (req.session.user && req.session.user.role === 'user') return next()
    //     if (req.session.user) return next()
    //     return res.status(401).render('login', {mensaje: '🚫 Inicie sesión.'})
    // }

router.get   ('/', authUser, read)
router.get   ('/:code', authUser, readById)
router.post  ( '/', authAdmin, create)
router.put   ( '/:code', authAdmin, updateById)
router.delete( '/:code', authAdmin, deleteById)

router.get('/abmproducts', authAdmin, async (req, res) => {
    const products = await productModel.find().lean().exec()
    res.render('abmproducts', { title: 'Modificar productos', products })
})

router.get('/abmproducts/:code', authAdmin, async (req, res) => {
    const code = req.params.code
    const oneProduct = await productModel.findOne( {code} ).lean().exec()
    const products = await productModel.find().lean().exec()
        // console.log('--- products:', products)
    res.render('abmproducts', { title: 'Administrar productos', oneProduct, products })
})




export default router