require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

route = require("./api/routes");
const dataSource = require("./api/models/dataSource");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.listen(PORT, async () => {
  await dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) => {
      console.error("Error during Data Source initialization", error);
    });

  console.log(`Listening to request on port: ${PORT}`);
});
