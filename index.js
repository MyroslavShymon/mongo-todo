const express = require("express");
const mongoose = require("mongoose");
const expressHbs = require("express-handlebars");
const todoRoutes = require("./routes/todos");

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = expressHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://shymon:1@cluster0.f49hc.mongodb.net/todos?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    app.listen(PORT, () => {
      console.log(`Server is run on port...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
