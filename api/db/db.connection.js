const mongoose = require('mongoose')

// db connection
const dbConnection = async () => {
    try{
        if(mongoose.connections[0].readyState) {
            return 
        }
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('db connected')
    }catch(err){
        console.log('db connection failed')
        process.exit(-1)
    }
}

// exports
module.exports = {
    dbConnection
}