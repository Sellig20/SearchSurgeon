const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://jeanne:Sellig20@cluster0.fjzp4df.mongodb.net/su';

const connection = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log("\n\n---> Conecté a MongoDB atlas <---\n\n");
    } catch (err) {
        console.error("\n\n---> Pas connecté a Mongodb atlas : ", err," <---\n\n");
    }
}


export default connection;