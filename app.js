const express = require("express");
const app = express();
const path = require("path");
const cookieiParser = require("cookie-parser");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");


const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieiParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/owners" , ownersRouter);
app.use("/users" , usersRouter);
app.use("/products" , productsRouter);

app.get("/", function (req, res) {
    res.render("login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});