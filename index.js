const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

let cars = [
  {
    id: 1,
    brand: "Porsche",
    model: "Panamera",
    year: 2018,
  },
  {
    id: 2,
    brand: "Fiat",
    model: "500",
    year: 2020,
  },
  {
    id: 3,
    brand: "VW",
    model: "Beetle",
    year: 1990,
  },
];

app.get("/getCars", function (req, res) {
  const sortedCars = [...cars].sort((a, b) => a.year - b.year);

  return res.status(200).json({
    response: "success",
    cars: sortedCars,
  });
});

app.get("/getCarById/:id", function (req, res) {
  const id = req.params.id;

  const car = cars.find((car) => {
    return car.id == id;
  });

  if (!car) {
    return res.status(404).json({
      message: `car with ${id} id does not exist`,
    });
  }

  return res.status(200).json({
    response: "success",
    car: car,
  });
});

app.delete("/deleteCars", function (req, res) {
  cars = [];

  return res.status(200).json({
    response: "all the cars was deleted",
  });
});

app.post("/insertCars", function (req, res) {
  const id = req.body.id;

  const existingCar = cars.find((car) => {
    return car.id === id;
  });

  console.log(existingCar);

  if (!existingCar) {
    cars.push({
      id: req.body.id,
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
    });

    return res.status(201).json({ message: "car was added successfully" });
  }

  return res.status(409).json({ message: "Car with this id is already exist" });
});

app.use((req, res) => {
  return res.status(404).send("Sorry, endpoint does not exist");
});

app.listen(3000);
