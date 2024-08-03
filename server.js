const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const routes = require("./controllers/index");
const handlebars = require("express-handlebars");
const { sequelize } = require("./config/connection");

const authMiddleware = require("./middleware/auth");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js as the template engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up session middleware with Sequelize store
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "I-Cant-Say", 
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 100 * 100, 
    },
  })
);

// Apply authentication middleware
app.use(authMiddleware);

// Set up routes
app.use("/", routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
