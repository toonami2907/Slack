import express from 'express';
import axios from 'axios';
import SlackRoute from './route/Slack.route.js';

const app = express();
const PORT = 8080; // Use the same port number

app.use(express.json());

// Default route
app.get("/", (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.status(200).json({
        status: "success",
        greeting: `Hello, welcome ${clientIp}`
    });
});

// API route using SlackRoute
app.use("/api", SlackRoute);

// Handle all other routes
app.all("*", (req, res) => {
    res.status(404).json({
        message: `Can't find ${req.method} method on ${req.originalUrl} on this server!`
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
