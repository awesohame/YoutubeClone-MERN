// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
dotenv.config({ path: "./env" });

import connectDB from "./db/index.js";
import app from "./app.js";

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log(err);
            throw err;
        });
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("mongo connection failed", err);
    })



// import express from "express";

// const app = express();

// ; (async () => {
//     try {
//         await mongoose.connect(`process.env.MONGO_URI/${DB_NAME}`)
//         app.on("error", (err) => {
//             console.log(err);
//             throw err;
//         });

//         app.listen(process.env.PORT, () => {
//             console.log(`Listening on port ${process.env.PORT}`);
//         });
//     }
//     catch (err) {
//         console.log(err);
//         throw err;
//     }
// })()
