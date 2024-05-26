const mongoose = require("mongoose")
const {PASSWORD,URI,USER_NAME,DB} = require("./params")



const connectDB = async () => {
   try {
    await mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}${DB}.${URI}`,{dbName: 'shopApp'})
    console.log('connected to ' + DB + ' as ' + USER_NAME)
     
   } catch (error) {
    console.log(error)
   }
    

}

module.exports = connectDB