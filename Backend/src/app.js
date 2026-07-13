const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");

const app= express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

//all require route goes here
const userRouter = require("./routes/auth.route");
const interviewRouter = require("./routes/interview.route");

// all routes goes here
app.use("/api/auth", userRouter);
app.use("/api/interview", interviewRouter);



app.use(errorHandler);

module.exports = app;