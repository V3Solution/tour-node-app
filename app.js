const express = require('express');
const dotenv = require('dotenv')
dotenv.config({path:'./Config/config.env'})
const app = express();
const winston = require('winston')


require('./Startup/db')()
require('./Startup/routes')(app)


const port = process.env.PORT || process.env.PORT_NUMBER;
app.listen(port,()=>{
    console.log(`App Will Be Listening on The Given Port ${port}...`)
})