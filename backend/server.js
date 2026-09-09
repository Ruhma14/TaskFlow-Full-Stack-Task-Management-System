const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// ROUTES

const taskRoutes = require("./routes/task.routes");


// HOME ROUTE

app.get("/", (req, res) => {

    res.send("TaskFlow API is running!");

});


// TASK ROUTES

app.use("/api/tasks", taskRoutes);


// MONGODB CONNECTION

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected!");

        app.listen(process.env.PORT, () => {

            console.log(
                `Server running on port ${process.env.PORT}`
            );

        });

    })

    .catch((error) => {

        console.log(
            "MongoDB connection failed:",
            error.message
        );

    });