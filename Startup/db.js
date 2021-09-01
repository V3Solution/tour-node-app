const mongoose = require('mongoose');
const winston = require('winston')
module.exports = function(){
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
    

})
.then(()=>{
    winston.info('MongoDB Is Connected...!')
})
}