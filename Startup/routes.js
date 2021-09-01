const express = require('express');
const TourRouter = require('../Routers/tourRouter');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/tourrouter',TourRouter)
}