import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { authRouter } from "./service/routers/auth.route.js";
import { playerRoute } from "./service/routers/player.route.js";
import { centerRoute } from "./service/routers/center.route.js";
import { fieldRoute } from "./service/routers/field.route.js";
import { badRequest, unathorizedError, notFoundError, genericError } from "./service/middlewares/errorHandler.js";
import passport from "passport";
import googleStrategy from "./service/middlewares/authgoogle.js";
import { bookRoute } from "./service/routers/book.route.js";
import {disponibilityRoute} from "./service/routers/disponibility.route.js";


const app = express()
config()

//connessione per il frontend
app.use(cors());

//per abilitare i dati json
app.use(express.json());

//login con google
passport.use("google", googleStrategy);

//utilizzo delle route
app.use("/auth", authRouter);
app.use("/player", playerRoute);
app.use("/center", centerRoute);
app.use("/field", fieldRoute);
app.use("/book", bookRoute);
app.use("/disponibility", disponibilityRoute);

//gestione degli errori
app.use(badRequest);
app.use(unathorizedError);
app.use(notFoundError);
app.use(genericError);

//Connessione al server
const initserver = async () => {

    try {
        await mongoose.connect(process.env.API_MDB);

        console.log("Connessione riuscita");
        
        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${process.env.PORT}`)
          })
    } catch (err) {
        console.error("Connessione fallita", err);
    }

}

//Invocare la funzione per il server
initserver()