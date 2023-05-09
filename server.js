//Imports express
const express = require('express');

//Assigns express to const app
const app = express();

//Sets port
PORT = process.env.PORT || 3001;

//Imports routes
const apiRoute = require('./Routes/apiRoute');
const htmlRoute = require('./Routes/htmlRoute');

//Middleware to parse
app.use(express.json());
app.use(
    express.urlencoded({
    extended: true,
    })
);

//Middleware to serve static files from public folder
app.use(express.static('public'));

//Middleware to define routes
app.use('/api', apiRoute);
app.use('/', htmlRoute);

//Starts Express and sets port
app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);