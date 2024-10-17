const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");

const postRouter = require("./routes/postRouter");
const userInfoRouter = require("./routes/userInfoRouter");

const { checkUser } = require("./middleware/checkUser");

const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173", // Development ortamındaki frontend URL'si
  "https://alisocial.onrender.com" // Frontend'in Render üzerinde deploy edildiği URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/auth", authRouter);

app.use("/post", checkUser, postRouter);
app.use("/userInfo", checkUser, userInfoRouter);

app.listen(process.env.PORT || 5000, async () => {
  console.log("Server is running on port 5000");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
