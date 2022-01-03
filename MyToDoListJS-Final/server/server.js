if(process.env.NODE_ENV != "production") {
    require("dotenv").config({
        path: `${__dirname}/.env`
    });
}

const applicationInsights = require("applicationinsights");
applicationInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
.setAutoCollectConsole(true, true)
.start();

const express = require("express");
const path = require("path");
const middleware = require("./middleware/middleware");
const errorHandlingMiddleware = require("./middleware/error-handling");

const PORT = process.env.PORT || 9000;

// Controllers
const UsersController = require("./controllers/users-controller");
const ToDosController = require('./controllers/todos-controller');
const ManualOperationsController = require("./controllers/manual-operations-controller");



const app = express();
const clientRoot = path.join(__dirname, "..", "/client/dist/packt-app-service");

middleware(app, clientRoot);

app.use("/api/users", UsersController);
app.use("/api/todos", ToDosController);
app.use("/api/manual-operations", ManualOperationsController);

app.get("/", (req, res) => {
    res.sendFile(path.join(clientRoot, "index.html"));
});

app.get("/return-error", (req, res) => {
    res.sendStatus(500);
});

app.get("/cause-error", (req, res) => {
    let b = 3;
    b();
});

errorHandlingMiddleware(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});