const express = require("express");
const path = require("path");
const middleware = require("./middleware/middleware");
const errorHandlingMiddleware = require("./middleware/error-handling");

// Controllers
const UsersController = require("./controllers/users-controller");
const ToDosController = require('./controllers/todos-controller');

const app = express();
const clientRoot = path.resolve(__dirname, "..", "/client");

middleware(app, clientRoot);

app.use("/api/users", UsersController);
app.use("/api/todos", ToDosController);

app.get("/", (req, res) => {
    res.send("Hello World");
});

errorHandlingMiddleware(app);

app.listen(9000, () => {
    console.log("Server running on port 9000");
});
