import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxlength: 60
    },
    dec: {
        type: String,
        required: true,
        maxlength: 200
    },
    img: {
        type: String,
        required: true,
    },
    prices: {
        type: [Number],
        required:true
    },
    extraOptions: {
        type: [
            {
                text: { type: String, require: true }, 
                price: {type: Number, required: true }
            },
        ],
    }
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);