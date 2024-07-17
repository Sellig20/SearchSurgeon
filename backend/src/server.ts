import express from 'express';
import mongoose from 'mongoose';
import router from "./routes";
import connectionToMongo from './db';

const app = express();
const PORT = process.env.PORT || 3000;

connectionToMongo();

app.use(express.json());
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Hello BOUSERIEEEEE!" });
});

app.use('/searchsurgeon', router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});