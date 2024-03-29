const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user-routes");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors({credentials: true}));
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});

app.use("/api", userRouter);

app.get("/",(req, res) => {
    res.status(200).send("hello world");
})

mongoose
.connect(process.env.MONGOURL)
.then(() => {
    console.log("connected to database successfully...");
})

// listening to port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
