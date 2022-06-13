require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const rootDir = require("./utils/path");
const clientPath = "./client/build";

const PORT = process.env.PORT || 3333;
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(rootDir, "../client/build")));

// Serve static resources from the "public" folder (ex: when there are images to display)
app.use(express.static(path.join(rootDir, "..", "client", "build")));

const usersList = require("./data/users");
const gamesList = require("./data/games");

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
  if (
    usersList.find(
      (user) => user.username === username && user.password === password
    )
  ) {
    req.session.user = {
      username,
    };
    return res
      .status(200)
      .json({ message: "login successful", sessionUser: { username } });
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

app.get("/games", (req, res) => {
  const sessionUser = req.session.user;
  if (sessionUser) {
    return res
      .status(200)
      .json({ message: "fetch successful", data: gamesList });
  }
  return res.status(401).json({ message: "unauthorized" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir, "..", "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
