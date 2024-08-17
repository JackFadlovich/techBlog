const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const routes = require("./controllers/index");
const sequelize  = require("./config/connection");
const exphbs = require('express-handlebars');

const authMiddleware = require("./middleware/auth");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js as the template engine

app.set("view engine", "handlebars");
const hbs = exphbs.create({
  // Custom helpers
  helpers: {
    formatDate: (date) => {
      return new Date(date).toLocaleDateString();
    },
    capitalize: (text) => {
      if (text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      }
      return '';
    },
  },
});
app.engine('handlebars', hbs.engine);
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
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Apply authentication middleware
//app.use(authMiddleware);

// Set up routes
app.use("/", routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
