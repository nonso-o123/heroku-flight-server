import express from 'express'
import contactUsModel from '../models/contactUsModel.js';
import nodemailer from 'nodemailer'
import config from '../config.js'
import google from 'googleapis'


const router = express.Router()

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: config.EMAIL,
        clientId: config.GMAIL_CLIENTID,
        clientSecret: config.GMAIL_SECRET,
        refreshToken: config.GMAIL_REFRESH_TOKEN,
        accessToken: config.GMAIL_ACCESS_TOKEN,
    }
})

transport.verify((error) => {
    error ? console.log(error) : console.log('Ready to send')
})


router.post('/sendmessage', async (req, res) => {
    try {
        console.log("req:" + req.body.email)
        const contactMessage = new contactUsModel({
            email: req.body.email,
            c_message: req.body.c_message,
        })
        const newContactMessage = await contactMessage.save()
        console.log(newContactMessage)
        res.send({
            _id: newContactMessage.id,
            email: newContactMessage.email,
            c_message: newContactMessage.message
        })

        //SEND MESSAGE TO EMAIL
        transport.sendMail({
            from: newContactMessage.email,
            to: config.EMAIL,
            subject: "New Message",
            text: newContactMessage.c_message
        })
    } catch (error) {
        console.log(err)
        res.send({ msg: error.message })
    }
})



//FETCH MESSAGES
router.get("/", async (req, res) => {
    const messages = await contactUsModel.find({});
    res.status(200).json(messages);
});

//SEND MESSAGE TO EMAIL
export default router