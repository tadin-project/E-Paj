const main = async () => {
  require("dotenv").config();
  const cookieParser = require("cookie-parser");
  const cors = require("cors");
  const express = require("express");
  const path = require("path");

  const { corsOptions, dbConn } = require("./src/config/config");
  const { logger, errorHandler } = require("./src/middlewares/middlewares");
  const {
    RootRoute,
    UserRoute,
    AuthRoute,
    GroupRoute,
  } = require("./src/routes/routes");

  const app = express();
  const PORT = process.env.APP_PORT || 3500;

  // middlewares
  app.use(logger);
  // app.use(cors(corsOptions));
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  // Testing database connection
  try {
    await dbConn.authenticate();
    console.log("DB connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.use("/", express.static(path.join(__dirname, "public")));
  app.use("/", RootRoute);

  app.use("/api/auth", AuthRoute);
  app.use("/api/groups", GroupRoute);
  app.use("/api/users", UserRoute);

  app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "public", "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({
        msg: "Page Not Found",
      });
    } else {
      res.type("txt").send("Page Not Found");
    }
  });

  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server run on port: ${PORT}`));
};

main();
