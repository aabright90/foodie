import dbConnect from "../../../lib/mongo"
import Product from "../../../models/Product"

export default async function handler(req, res) {
    const { method, body } = req 

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const products = await Product.find({})
                return res.status(201).json(products)
            } catch(err) {
                res.status(500).json(err)
            }
        case 'POST':
            try {
                const product = await Product.create(body)
                return res.status(201).json(product)
            } catch(err) {
                res.status(500).json(err)
            }
        case 'PATCH':
        case 'DELETE':
    }
}