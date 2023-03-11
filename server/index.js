if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//setting up express
const app = express();
const port = process.env.PORT || 5000;

const blogRoutes = require("./Routes/blogs");
const userRoutes = require("./Routes/users");
const commentRoutes = require("./Routes/comments");

//setting up mongoose
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/blogSite");
  console.log("Mongo connection open");
}

// app.use(session({ secret: "grant" }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "PUT", "DELETE", "GET", "POST");
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("<h3>Welcome to this blog site</h3>");
// });

app.use("/", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs/comment", commentRoutes);

// create common error handler

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no! Something went wrong.";
  res.status(statusCode).send({ err: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
