require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./DB/dbConnection");

const app = express();
app.use(express.json());
app.use(cors());

//DB Connection
connectDB();

//Router Setups
app.use("/api", require("./routers/search"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The Server has been started on localhost port ${PORT}`);
});
