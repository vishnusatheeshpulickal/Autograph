const express = require("express");
const app = express();
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session");
require("dotenv").config();

app.set("view engine", "pug");
app.set("views", "views");

app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 378000000 },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logout");
const postRoute = require("./routes/postRoutes");
const profileRoute = require("./routes/profileRoutes");

//Api Routes
const postApiRoute = require("./routes/api/posts");
const usersApiRoute = require("./routes/api/users");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/post", middleware.requireLogin, postRoute);
app.use("/profile", middleware.requireLogin, profileRoute);

app.use("/api/posts", postApiRoute);
app.use("/api/users", usersApiRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: "Home",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };
  res.status(200).render("home", payload);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
