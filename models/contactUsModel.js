import mongoose from 'mongoose'

const contactUsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    c_message: { type: String, required: true }
})

const contactUsModel = mongoose.model("ContactMessage", contactUsSchema)

export default contactUsModel