import mongoose from "mongoose"
const cartsCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number
        }],
        default: []
    }
})

mongoose.set('strictQuery', false)

const cartModel = mongoose.model(cartsCollection, cartSchema)

export default cartModel