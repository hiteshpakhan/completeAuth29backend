const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user-routes");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors({ origin: "https://complete-auth29frontend2.vercel.app", credentials: true }));
app.use(cookieParser());
app.use(express.json());

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
