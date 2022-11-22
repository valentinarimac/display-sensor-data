import "./NewData.css";

function NewData(props) {
  return (
    <div className="NewData">
      <div className="title">Najnoviji podaci</div>
      <div>
        <div className="item">
          Datum i vrijeme:
          <span>
            {props.addedData.date_time.substr(0, 10) +
              " " +
              props.addedData.date_time.slice(11, 19)}
          </span>
        </div>
        <div className="item">
          Temperatura (°C): <span>{props.addedData.temp}</span>
        </div>
        <div className="item">
          Vlažnost (%): <span>{props.addedData.hum}</span>
        </div>
        <div className="item">
          Tlak (hPa): <span>{props.addedData.press}</span>
        </div>
      </div>
    </div>
  );
}

export default NewData;
