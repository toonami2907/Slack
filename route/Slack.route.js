import express from 'express'
const router = express.Router()

router.get("/hello" ,(req, res)=>{
    const visitorName = req.query.visitor_name;
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (visitorName) {
        res.status(201).json({
            status: "success",
            client_ip: clientIp,
            location: "New York",
            greeting: `Hello, ${req.query.visitor_name}, the temperature is 11 degrees Celcius in New York`
        })
    } else {
        res.status(201).json({
            message: "Hello Vistor"
        })
    }
} )



export default router
