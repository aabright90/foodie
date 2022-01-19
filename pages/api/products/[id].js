import dbConnect from "../../../lib/mongo"
import Product from "../../../models/Product"

export default async function handler(req, res) {
    const { method, query: { id }, body } = req 

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const product = await Product.findById(id)
                return res.status(201).json(product)
            } catch(err) {
                res.status(500).json(err)
            }
            break
        case 'PUT':
            try {
                const product = await Product.findByIdAndUpdate(id, body, {
                    new: true
                })
                return res.status(201).json(product)
            } catch(err) {
                res.status(500).json(err)
            }
            break
        case 'DELETE':
            try {
                await Product.findByIdAndDelete(id)
                res.status(200).json('Record Deleted')
            } catch(err) {
                res.status(500).json(err)
            }
    }
}