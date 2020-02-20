const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("./src/config.js").env;
var session = require("express-session");
//var expressHbs = require('express-handlebars');

const app = express();
// app.use(
//   session({ secret: "kuchbhi@#!@23", resave: false, saveUninitialized: true })
// );
let options = {
  // import swaggerDefinitions
  swaggerDefinition: require("./config/swagger"),
  // path to the API docs
  apis: ["./src/routers/*.js"] // pass all in array
};

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({resave: false, saveUninitialized: false, secret: 'XCR3rsasa%RDHHH', cookie: { maxAge: 60000 }
// console.log();

}

));

//view engine setup
// app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
// app.set('view engine', '.hbs');
app.use(express.static(__dirname + "/public"));

mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(async () => {
    const indexRouter = require("./src/routers/index");
    const onwerRouter = require("./src/routers/onwer");
    const adminRouter = require("./src/routers/admin");

    app.use("/", indexRouter);
    app.use("/owner", onwerRouter);
    app.use("/admin/", adminRouter);

    // serve swagger
    app.get("/api-docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });

    // catch 404 and forward to error handler
    // app.use((req, res, next) => {
    //   var err = new Error("Not Found");
    //   err.status = 404;
    //   next(err);
    // });

    // error handler
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      console.log(err);

      res.send({
        msg: err.message,
        status: err.status
      });
    });

    app.listen(config.server, () => {
      console.log("Server is up on port no 3000");
    });
  })
  .catch(err => console.error(err.message));

module.exports = app;
