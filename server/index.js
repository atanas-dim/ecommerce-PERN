require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const passport = require("./passport");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { handleError } = require("./helpers/errors");

const port = process.env.PORT || 4000;

//middlewaree
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// next two middleware used for flash messages
app.use(cookieParser("test cookie parser"));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
// Mounting the apiRouter at the '/api' path.
const apiRouter = require("./routes");
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
