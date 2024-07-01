import express from 'express';
import axios from 'axios';

const router = express.Router();

// Your API keys
const IP_GEOLOCATION_API_KEY = '94f461ca22eb4e8993c8f6c7036d6220';
const WEATHER_API_KEY = 'e165e31257e84307a8a183844240107';

router.get("/hello", async (req, res) => {
    const visitorName = req.query.visitor_name || 'Visitor';
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Handle local testing with a placeholder IP address
    const ipToUse = (clientIp === '::1' || clientIp === '127.0.0.1') ? '8.8.8.8' : clientIp;

    let city, country;

    try {
        // Using the IP Geolocation API to get the client's location
        const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo`, {
            params: {
                apiKey: IP_GEOLOCATION_API_KEY,
                ip: ipToUse
            }
        });

        city = geoResponse.data.city;
        country = geoResponse.data.country_name;
        console.log(`Geolocation API Response: City: ${city}, Country: ${country}`);

        // Using the weather API with the obtained city
        const weatherResponse = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: WEATHER_API_KEY,
                q: `${city},${country}`, // Dynamic location based on IP Geolocation
                aqi: 'no'
            }
        });

        const location = weatherResponse.data.location.name;
        const temperature = weatherResponse.data.current.temp_c;
        console.log(`Weather API Response: Location: ${location}, Temperature: ${temperature}`);

        res.json({
            client_ip: clientIp,
            location: `${location}, ${country}`,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}, ${country}`
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


export default router;
