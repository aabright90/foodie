import User from '../../../models/User'
import dbConnect from "../../../lib/mongo";
import CryptoJS from "crypto-js";

export default async function handler(req, res) {
const { method, body } = req

    await dbConnect()

    switch (method) {
        case 'POST':   
        try {
            body.password = CryptoJS.AES.encrypt(body.password, process.env.SECRET_KEY).toString()
            
            const user = await User.create(body)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json('Request Failed')
        }
        case 'GET':   
        try {  
            const token = cookies.token 
            res.status(200).json(token)
        } catch (error) {
            res.status(500).json('Request Failed')
        }     
    }
}


