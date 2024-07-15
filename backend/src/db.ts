const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://jeanne:Sellig20@cluster0.fjzp4df.mongodb.net/mongo?retryWrites=true&w=majority';

const connection = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log("Conecte a MongoDB atlas");
    } catch (err) {
        console.error("erreur de co a mongodb : ", err);
        process.exit(1);
    }
}

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
// db.once('open', () => {
//     console.log('Connecté à MongoDB Atlas');
// });

export default connection;

// export default mongoURI;