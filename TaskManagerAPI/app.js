require("dotenv").config();
const express = require("express");
const cors = require("cors");
//const session=require("express-session");
//const MongoStore=require("connect-mongo").default;
const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

// //app.use(session({
//   secret:"tasksecret",
//   resave:false,
//   saveUninitialized:false,
//   store:MongoStore.create({mongoUrl:process.env.URL}),
//   cookie:{maxAge:1000*60*60}
// }));
const connectDb = require("./src/config/db");
const userRouter = require("./src/router/userRouter");
const taskRouter = require("./src/router/taskRouter");


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
