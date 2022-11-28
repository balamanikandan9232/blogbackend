const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const authUser = require("./routes/user");
const authPost = require("./routes/posts");
const authCat = require("./routes/categories");

const path = require("path");
const multer = require("multer");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDb"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images");
  },
  filename: (req, file, callb) => {
    callb(null, "file.png");
  },
});
const upload = multer({ storage: storage });
app.post(
  "/upload",
  upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  })


app.use("/auth", authRoutes);
app.use("/users", authUser);
app.use("/posts", authPost);
app.use("/category", authCat);

app.listen("5000", () => {
  console.log("backend running");
});
