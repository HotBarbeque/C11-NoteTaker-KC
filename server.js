const express = require('express');
const app = express();

// port
PORT = process.env.PORT || 3001;

const apiRoute = require('./Routes/apiRoute');
const htmlRoute = require('./Routes/htmlRoute');
app.use(express.json());
app.use(
    express.urlencoded({
    extended: true,
    })
);
app.use(express.static('public'));
app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);