const mongoose = require('mongoose')


const connectBD = (url) => {
    return mongoose.connect(url).then(()=> console.log(`DB is connected successfully`)).catch((error)=>console.log(`There was an error => ${error}`))
}


module.exports = connectBD