require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const { swaggerSpecs, swaggerUI } = require("./swagger");
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
    Credential: true,
}));
app.use(cookieParser());
app.use('/api/v1', apiRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

const ssl_option = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};


const port = process.env.PORT || 8800;
const secure_port = process.env.SECURE_PORT || 8443;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
https.createServer(ssl_option, app).listen(secure_port, () => {
    console.log(`HTTPS Server listening on port ${secure_port}`);
});
