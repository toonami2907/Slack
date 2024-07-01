import express from 'express'
import axios from 'axios';
const router = express.Router()

router.get("/hello" , async(req, res)=>{
    const visitorName = req.query.visitor_name || 'Visitor';
    const clientIp = req.ip || '127.0.0.1';

    try {
        // Using the provided weather API
        const weatherResponse = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: '38f0e38316524249b7c00227240107',
                q: 'New York', // Static location for demonstration
                aqi: 'no'
            }
        });

        const location = weatherResponse.data.location.name;
        const country = weatherResponse.data.location.country;
        const temperature = weatherResponse.data.current.temp_c;

        res.json({
            client_ip: clientIp,
            location: `${location}, ${country}`,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}, ${country}`
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
} )



export default router
