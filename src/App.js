import React, { useState } from 'react';
import './App.css';
function App() {
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunSet, setSunSet] = useState('');
  const [isReady, setReady] = useState(false);
  React.useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=14.6937&lon=-17.4441&appid=25867e1ecdb4c8f03b0c903fda34b7c4&units=metric'
    )
      .then((result) => result.json())
      .then((jsonresult) => {
        console.log('json ', jsonresult);
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setCity(jsonresult.name);
        setSunrise(jsonresult.sys.sunrise);
        setSunSet(jsonresult.sys.sunset);
        setReady(true);
      })
      .catch((err) => console.error(err));
  }, []);
  if (isReady) {
    return (
      <div className='container d-flex flex-column justify-content-center'>
        <div className='mt-2 text-bg-dark text-center'>
          <h1>My weather app</h1>
        </div>
        <div
          className={`mt-4 bg-${
            temp > 25 ? 'danger' : 'success'
          }-subtle rounded`}>
          <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
            <h4>Temperature</h4>
            <p> {temp} °C</p>
          </div>
          <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
            <h4>City</h4>
            <p> {city}</p>
          </div>
          <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
            <h4>Description</h4>
            <p> {desc}</p>
          </div>
          <div className='d-flex  align-items-center justify-content-between col-6 ms-3'>
            <h4>Illustration</h4>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt='Weather icon'
            />
          </div>

          <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
            <h4>Sunrise</h4>
            <p> {sunrise}</p>
          </div>
          <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
            <h4>Sunset</h4>
            <p> {sunSet}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default App;
