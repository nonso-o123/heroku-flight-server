import express from 'express'
import User from '../models/userModel.js'
import mongoose from "mongoose"
import nodemailer from 'nodemailer'
import config from '../config.js'

import { getToken } from '../util.js'





const {
    ObjectId
} = mongoose.Types;
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
        // serviceClient: config.SVC_CLIENT,
        // privateKey: config.SVC_PRIVATE_KEY,
        accessToken: config.GMAIL_ACCESS_TOKEN,
    }
})

transport.verify((error) => {
    error ? console.log(error) : console.log('Ready to send')
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            fName: 'Chibuike2',
            lName: 'Chibyke',
            email: 'example2@example.com',
            password: '12345',
            isAdmin: true
        })

        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        res.send({ msg: error.message })
    }
})

router.post("/signin", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.fName,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({ message: "Invalid email or password" })
    }
})
router.post("/register", async (req, res) => {
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password
    })
    const newUser = await user.save()
    console.log(newUser)
    if (newUser) {
        res.send({
            _id: newUser.id,
            fName: newUser.fName,
            lName: newUser.lName,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
        try {
            transport.sendMail({
                from: newUser.email,
                to: config.EMAIL,
                subject: "New User Registration",
                text: `
             Name: ${newUser.fName} ${newUser.lName}
             Email: ${newUser.email}`
            })
            console.log("new user sent to email")
        } catch (error) {
            console.log(`${error}, new user not sent to email`)
        }
    } else {
        res.status(401).send({ message: "Invalid user data" })
    }
})

// FETCH ALL USERS
router.get("/", async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// DELETE USER 
router.get("/:userId", async (req, res) => {
    const user = await User.deleteOne({ _id: req.params.userId });
    res.status(200).json({ userId: req.params.userId });
});

// PUT USER 
router.put("/:userId", async (req, res) => {
    const user = await User.findOne({ _id: ObjectId(req.params.userId) });
    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.email = req.body.email;
    user.isAdmin = req.body.isAdmin;

    await user.save();
    res.status(200).json({ userId: req.params.userId });
});

// PUT USER 
router.get("/logout", async (req, res) => {
    // TODO
    // Clear login data if any
});


export default router