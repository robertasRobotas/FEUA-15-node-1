const express = require("express");
const cors = require("cors");
const app = express();

const carRouter = require("./src/router/car");

app.use(cors());
app.use(express.json());
app.use(carRouter);

app.use((req, res) => {
  return res.status(404).send("Sorry, endpoint does not exist");
});

app.listen(3000, () => {
  console.log("Your application was launched successfully on port 3000");
});
