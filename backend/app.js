require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors({
  origin: "https://task-management-1-pahq.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sequelize = require("./config/db");
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskrouter');
const commentRouter = require('../backend/routes/commentrouter');
const adminRouter = require("./routes/AdminRouter");
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/comment", commentRouter);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
app.get('/', (req, res) => {
  res.send('Hello World!');
}
);
app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});