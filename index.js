import express from 'express'
import axios from 'axios'

import SlackRoute from './route/Slack.route.js'
import { configDotenv } from 'dotenv'

const app = express()

app.use(express.json())
// app.use("/", (req, res)=>{
//     const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     res.status(201).json({
//         status: "success",
//         greeting:`hello welcome ${clientIp}`
//     })
// })
app.use("/api", SlackRoute)

app.all("*", (req,res) => {
    res.status(404).json({
        message: `Can't find method ${req.method} on ${req.originalUrl} on this server!`
    })
    
})

app.listen(8080, () => {
    console.log(`Serving on port 8080`);
  });