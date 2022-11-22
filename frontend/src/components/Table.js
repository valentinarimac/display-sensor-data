import { useEffect, useState } from "react";
import "./Table.css";

function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    await fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((resData) => {
        setData(() => [...resData]);
        setLoading(() => false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <div>
      {!loading && (
        <table className="tableContainer">
          <thead>
            <tr>
              <th> </th>
              <th>Datum i vrijeme</th>
              <th>Temperatura (°C)</th>
              <th>Vlažnost (%)</th>
              <th>Tlak (hPA)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>
                  {item.date_time.substr(0, 10) +
                    " " +
                    item.date_time.slice(11, 19)}
                </td>
                <td>{item.temp}</td>
                <td>{item.hum}</td>
                <td>{item.press}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
