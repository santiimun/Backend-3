import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import "dotenv/config"

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js"


const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(process.env.MONGO_DB_URL)

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("Conectado a MongoDB");
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
