import dbConnect from "../../../lib/mongo"
import Order from "../../../models/Order"

const handler = async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const order = await Order.find()
                res.status(200).json(order)
            } catch (error) {
                res.status(500).json(error)
            } 
        case 'POST':
            try {
                const order = await Order.create(req.body);
                res.status(201).json(order);
            } catch (error) {
                res.status(500).json(error)
            }    
    }
}

export default handler