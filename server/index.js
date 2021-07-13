const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const port = 3000;

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
