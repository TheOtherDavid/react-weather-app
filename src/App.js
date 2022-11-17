import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';

export default function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [zipCode, setZipCode] = useState([]);

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
          console.log(result);
        });
//The second argument shows which variables to watch, to determine when to refresh. An empty array forces it to only run once.
  }, [lat, long]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      //const dt = { code: `${code}` };
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${zipCode}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
  
      setData(resp.data);
    };

    console.log("Latitude is:", lat)
    console.log("Longitude is:", long)

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div></div>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" 
        onChange={event => setZipCode({ zipCode: event.target.value})}
        placeholder="Zip Code" 
        required />
        <button type="submit">Find weather!</button>
      </form>
    </div>
  );
}