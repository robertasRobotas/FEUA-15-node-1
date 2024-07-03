const express = require("express");

const {
  GET_CARS,
  GET_CAR_BY_ID,
  DELETE_CARS,
  INSERT_CARS,
} = require("../controller/car");

const router = express.Router();

router.get("/getCars", GET_CARS);

router.get("/getCarById/:id", GET_CAR_BY_ID);

router.delete("/deleteCars", DELETE_CARS);

router.post("/insertCars", INSERT_CARS);

module.exports = router;
