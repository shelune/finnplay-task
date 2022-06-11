require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const rootDir = require("./utils/path");
const clientPath = "./client/build";

// console.log(rootDir);

const PORT = process.env.PORT || 3333;
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

// Serve static resources from the "public" folder (ex: when there are images to display)
app.use(express.static(path.join(rootDir, "..", clientPath, "index.html")));

const usersList = require("./data/users");

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
  },
};

app.use(session(sessionOptions));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({ message: "missing username / password" });
  }
  console.log(
    usersList.find(
      (user) => user.username === username && user.password === password
    )
  );
  if (
    usersList.find(
      (user) => user.username === username && user.password === password
    )
  ) {
    req.session.user = {
      username,
    };
    return res.status(200).json({ message: "login successful" });
  } else {
    return res.status(401).json({ message: "incorrect username / password" });
  }
});

app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
    res.clearCookie("sessionId");
    res.status(204).send();
  });
});

app.get("/isAuth", (req, res) => {
  const sessionUser = req.session.user;
  if (sessionUser) {
    return res.status(200).json({ message: "authenticated", sessionUser });
  }
  return res.status(401).json({ message: "unauthorized" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});