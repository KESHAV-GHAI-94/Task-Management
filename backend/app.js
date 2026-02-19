require("dotenv").config();
const express = require('express');
const app = express();
// const cors = require('cors');
// app.use(cors());
// app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sequelize = require("./config/db");
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskrouter');
const commentRouter = require('./routes/commentRouter');
const adminRouter = require("./routes/AdminRouter");
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/comment", commentRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
}
);
app.listen(process.env.PORT || 4000, () => {
  console.log('listening on port 4000!');
});