const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const profileRouter = require("./Router/profileRoute.js");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const MongoUrl = `mongodb+srv://vicknesh10996:AmGIH6NcqJnDRh6g@cluster0.zenxqa9.mongodb.net/profile?retryWrites=true&w=majority&appName=Cluster0`;

// app.get("/", (req, res) => {
//   res.send("hello viki");
// });
// app.post("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Successfully got response", data: req.body });
// });
mongoose
  .connect(MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to db"))
  .catch((err) => console.log(err));
app.use(cors());
app.use("/", profileRouter);
app.use("*", (req, res) => {
  res.status(404).json({ msg: "url not found" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Internal Server Error" });
});

app.listen(5000, () => {
  console.log("server is running");
});
