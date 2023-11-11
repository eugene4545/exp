const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to check if it's a working day and time (off hour visit sets off 404 response with accompanying message)
const checkOnlineHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {   //message to be sent if site visited at downtime hours
        res.status(403).send('<div style="display: flex; flex-direction: column; align-items: center; text-align: center; font-family: Roboto, sans-serif;"><h1 style="font-size: 2em;">\u{1F634} \u{1F634} \u{1F634}</h1><h1>This site is only available during working hours (Mon-Fri, 9-17). Please check back on us.</h1></div>');


    }
};

app.use(checkOnlineHours);  //middleware initialized. . .

app.use(express.static('public')); //we load our html files from here

//routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html'); 
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
