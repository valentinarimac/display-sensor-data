import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Table from "./components/Table";
import LineChart from "./components/LineChart";
import NewData from "./components/NewData";
import "./App.css";
const { io } = require("socket.io-client");
const socket = io("http://localhost:5000");

function App() {
  const initialSensorData = {
    _id: " ",
    date_time: " ",
    temp: 0,
    hum: 0,
    press: 0,
  };

  const [sensorData, setSensorData] = useState([initialSensorData]);
  const [newData, setNewData] = useState(initialSensorData);

  async function fetchData() {
    await fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((resData) => {
        setSensorData(() => [...resData.slice(-10)]);
      });
  }

  useEffect(() => {
    fetchData();

    socket.on("connect", () => {
      console.log("Connected");
      console.log(socket.connected);
    });

    socket.on("disconnect", () => {
      console.log("Connected");
      console.log(socket.connected);
    });

    socket.on("newData", (addedData) => {
      console.log("New data added", addedData);
      fetchData();
      setNewData(() => addedData);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <nav className="navBar">
          <Link to="/" className="navBarItem">
            Temperatura
          </Link>
          <Link to="/humidity" className="navBarItem">
            Vlažnost
          </Link>
          <Link to="/pressure" className="navBarItem">
            Tlak
          </Link>
          <Link to="/table" className="navBarItem">
            Tablica
          </Link>
          <Link to="/newData" className="navBarItem">
            Novi
          </Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <LineChart
                passSensorData={sensorData}
                passDataType={"temp"}
                labelValue="Temperatura (°C)"
              />
            }
          ></Route>
          <Route
            path="/humidity"
            element={
              <LineChart
                passSensorData={sensorData}
                passDataType={"hum"}
                labelValue="Vlažnost (%)"
              />
            }
          ></Route>
          <Route
            path="/pressure"
            element={
              <LineChart
                passSensorData={sensorData}
                passDataType={"press"}
                labelValue="Tlak (hPa)"
              />
            }
          ></Route>
          <Route
            path="/newData"
            element={<NewData addedData={newData} />}
          ></Route>
          <Route path="/table" element={<Table />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
