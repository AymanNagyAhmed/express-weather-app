const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../Temp1/views");
const partialsPath = path.join(__dirname, "../Temp1/partials");
const hbs = require("hbs");
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "HOME",
    message: "Wellcom to weather app",
  });
});

////////////////////////////////////////////////////////////////////////////
const geocode = require("./tools/geocode");
const forecast = require("./tools/forecastFile");

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.render("check_weather", {
      title: "Weather",
      message: "Wellcom to weather app",
      error: "You must provide address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      res.render("check_weather", {
        title: "Weather",
        message: "Wellcom to weather app",
        error: "You must provide address",
      });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        res.render("check_weather", {
          title: "Weather",
          message: "Wellcom to weather app",
          error: "You must provide address",
        });
      }
      res.render("check_weather", {
        title: "Weather",
        location: req.query.address,
        forecast: forecastData,
        error: " ",
      });
    });
  });
});

/////////////////////////////////////////////////////////////////////////////

app.get("*", (req, res) => {
  res.send("404 Page Not Founded");
});

///////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
