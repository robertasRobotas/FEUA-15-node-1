const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const cars = [
  {
    brand: "Porsche",
    model: "Panamera",
    year: 2018,
  },
  {
    brand: "Fiat",
    model: "500",
    year: 2020,
  },
];

app.get("/getCars", function (req, res) {
  return res.status(200).json({ response: "success", cars: cars });
});

app.post("/insertCars", function (req, res) {
  cars.push({
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
  });

  return res.status(201).json({ message: "car was added successfully" });
});

app.use((req, res) => {
  return res.status(404).send("Sorry, endpoint does not exist");
});

app.listen(3000);
