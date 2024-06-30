import express from 'express'
import SlackRoute from './route/Slack.route.js'

const app = express()

app.use(express.json())

app.use("/api", SlackRoute)

app.all("*", (req,res) => {
    res.status(404).json({
        message: `Can't find method ${req.method} on ${req.originalUrl} on this server!`
    })
    
})

app.listen(8080, () => {
    console.log(`Serving on port 8080`);
  });