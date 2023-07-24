import express from 'express'
import { Server } from 'socket.io'
import fs from 'fs'
import handlebars  from 'express-handlebars'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import local from 'passport-local'
import initializePassport from './config/passport.js'
import initializePassportGH from './config/github.js'
import { Command } from 'commander'
import dotenv from 'dotenv'

import productsRouter from './routes/products.router.js'
import cartsRouter    from './routes/carts.router.js'
import sessionRouter  from './routes/session.router.js'
// import realTimeProductsRouter from './routes/realTimeProducts.router.js'
// import newProductRouter from './routes/newProduct.router.js'


const app = express()

const program = new Command()
program
    .option('-p <port>', 'Port to connect', 8080)
    .option('--mode <mode>', 'description', 'development')
program.parse()

dotenv.config({
    path: (program.opts().mode === 'development') ? './.env.development' : './.env.production'
})
const PORT = process.env.PORT || 8080 //8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))


// MONGODB URI
    const MONGO_URI = process.env.MONGO_URI
//console.log('MONGO_URI: ', MONGO_URI);

// MONGODB SESSION
    app.use(session({
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            dbName: 'ecommerce39755',
            ttl: 60 * 30 , // media hora
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }),
        secret: '$0l0tuN',
        resave: true,
        saveUninitialized: true
    }))
    
    // const ProductManager = require('./ProductManager.js')
    // import ProductManager from './dao/ProductManager.js'
    // const productManager = new ProductManager('./dbProducts.json')
    
    // Handlebars templates
    app.engine('handlebars', handlebars.engine())
    app.set('views', './src/views')
    app.set('view engine', 'handlebars')
    
    // Endpoints
    // import productsRouter from './routes/products.router.js'
    
    // import cartRouter from './routes/cart.router.js'
    // app.use('/api/cart', cartRouter)
    
    // app.use('/api/products', productsRouter)
    // app.use('/api/carts', cartsRouter)
    // app.use('/api/products', apiRouter)
    // app.use('/api/carts', apiRouter)
    app.use('/products', productsRouter)
    app.use('/carts', cartsRouter)
    app.use('/session', sessionRouter)
    
    
    
    
    // app.use('/realtimeproducts', realTimeProductsRouter)
    
    // app.use('/newProduct', newProductRouter)
    
// PASSPORT
    initializePassport() // Passport con Usuario y Contraseña estandar
    initializePassportGH() // Passport con Usuario de GitHub
    app.use(passport.initialize())
    app.use(passport.session())


// MONGODB CONNECTION
    mongoose.set('strictQuery', false)
    
    try {
        await mongoose.connect(MONGO_URI) //mongoUri) // si no conecta: verificar rango de IP autorizada en Atlas
        console.log(process.env.MSG_LOG); //'[mongodb] Base de Datos conectada.');
        app.listen( PORT, () => console.log(`[express] HTTP listening on port ${process.env.PORT}...`) )
    } catch (error) {
        console.log('[mongodb] Error de conexión a la Base de Datos!!!!!!!!!');
    }

    


// Servers
    /* const serverHTTP = app.listen( PORT, () => {
        console.log(`[express] HTTP listening on port ${PORT}`) // HTTP on
    })

    const socketServer = new Server( serverHTTP ) */

    /* socketServer.on('connection',   (socketClient) => {
        console.log('[nodemon] SOCKET new client') // SOCKET on

        socketClient.on('newProduct', (newProduct) =>{
            console.log(`Datos recibidos en app.js: ${(newProduct)}`)
            let arrProduct = JSON.stringify(newProduct)
            console.log(`arrProduct: ${arrProduct}`)

            // productManager.addProduct()

            // socketClient.emit('product', newProduct)
        })
    }) */