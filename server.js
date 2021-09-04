import express from 'express';
import data from './data.js';
import config from './config.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import contactUsRoute from './routes/contactUsRoute.js'
import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
// const axios = require('axios')

// require('dotenv').config()
// const fetch = require('node-fetch');
const app = express();
dotenv.config()
app.use(bodyParser.json())

// const corsOptions = {
//     origin: "http://localhost:3000/api/*",
//     credentials: true,
//     // access-control-allow-credentials:true, 
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOptions))
// app.use(cors())

// const __dirname = fs.realpathSync('.')

const mongodburl = config.MONGODB
const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGODBURI || mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason))


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontent/build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname + '../frontend/build/index.html'))
//     })
// }
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000/api/cities"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000/api/airlines");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use("/api/users", userRoute)

app.get("/api/cities", cors(), (req, res) => {
    // console.log("done")
    res.send(data.cities);
});
app.get("/api/airlines", cors(), (req, res) => {
    // console.log("done")
    res.send(data.airlines);
});
app.use('/api/contactus', contactUsRoute)

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));