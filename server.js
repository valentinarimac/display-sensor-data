const express = require("express");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET"],
  },
});

io.on("connect", (socket) => {
  console.log(socket.id);
});

mongoose.connect(
  "mongodb+srv://valentina:db123@cluster0.5kkqhkq.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database connected");

  const dataChangeStream = connection.collection("rpi_data").watch();
  dataChangeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const addedData = {
        _id: change.fullDocument._id,
        date_time: change.fullDocument.date_time,
        temp: Number(change.fullDocument.temp),
        hum: Number(change.fullDocument.hum),
        press: Number(change.fullDocument.press),
      };
      io.emit("newData", addedData);
    } else {
      console.log("Data is not inserted");
    }
  });
});

function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const simulateSensorData = function () {
  const id = new ObjectId();
  const dateTime = new Date();
  const temperature = generateRandomIntegerInRange(20, 30);
  const humidity = generateRandomIntegerInRange(40, 80);
  const pressure = Math.random() * (1010 - 1005 + 1) + 1005;

  console.log(temperature, humidity, pressure);
  connection.collection("rpi_data").insertOne({
    _id: id,
    date_time: dateTime,
    temp: temperature,
    hum: humidity,
    press: pressure,
  });
};

setInterval(() => {
  simulateSensorData();
}, 3000);

app.get("/", (req, res) => {
  const collection = connection.collection("rpi_data");

  collection
    .find({})
    .toArray()
    .then((data) => res.json(data));
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
