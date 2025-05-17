import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';
import "dotenv/config";

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js"


const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("Conectado a MongoDB");
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });

const swaggerOptions= {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion API Adoptme",
            description: "Documentacion para uso de swagger"
        }
    },
    apis: ['./src/docs/**/*.yaml']
};

const specs = swaggerJSDoc(swaggerOptions);

app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
