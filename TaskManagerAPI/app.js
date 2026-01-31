require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDb = require("./src/config/db");
const userRouter = require("./src/router/userRouter");
const taskRouter = require("./src/router/taskRouter");

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err.message);
  }
};

startServer();
