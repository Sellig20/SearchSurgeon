import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import connection from './db';
import dotenv from 'dotenv';
import router from "./routes";

dotenv.config();
const app = express();
const PORT = process.env.BACKEND_PORT;

// connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("PORT ENV VARIABLE => ", process.env.BACKEND_PORT);

app.get('/', (req: Request, res: Response) => {
  res.send('Home!');
});

app.use('/searchsurgeon', router);

connection().then(() => {
  app.listen(3000, () => {
      console.log(`\n\nServeur démarré sur le port ${PORT}`);
  });
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });