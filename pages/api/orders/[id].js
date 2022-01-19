import dbConnect from "../../../lib/mongo"
import Order from "../../../models/Order"

const handler = async (req, res) => {
    const { method, query:{id}, body } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const order = await Order.findById(id)
                res.status(200).json(order)
            } catch (error) {
                res.status(500).json(error)
            }
            break 
        case 'PUT':
            try {
                const order = await Order.findByIdAndUpdate(id, body, {
                    new: true
                })
                res.status(200).json(order)
            } catch (error) {
                res.status(500).json(error)
            } 
            break    
        case 'DELETE':
            try {
                await Order.findByIdAndDelete(id)
                res.status(200).json('Record Deleted')
            } catch (error) {
                res.status(500).json(error)
            } 
    }
}

export default handler
