import User from '../../models/User'
import dbConnect from '../../lib/mongo'
import CryptoJS from 'crypto-js'
import cookie from 'cookie'

export default async function handler(req, res) {

    const { method, body } = req

    await dbConnect

    switch (method) {
        case 'POST':
            const user = await User.findOne({ username: body.username })
            const decrypted = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
        
        if (body.password === decrypted) {

            res.setHeader(
              "Set-Cookie",
              cookie.serialize("token", process.env.COOKIE_TOKEN, {
                  maxAge: 60 * 60,
                  sameSite: "strict",
                  path: "/",
              })
            )
            res.status(200).json('Successful')
        } else {
            res.status(400).json("Wrong Credentials!")
        } 
    }
}
