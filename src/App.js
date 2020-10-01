import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  // STATE = How to write a variable in react
  // https://disease.sh/v3/covid-19/countries
  // USEEFFECT = runs a pieace of code based on a given condition

  useEffect(() => {
    // run only once component load
    // async - send a req, wait for it, do something with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United states
            value: country.countryInfo.iso2, // UK USA
          }));
          setCountries(countries)
        });
    };
    getCountriesData();
  }, []);

  const onCountryChage = (e) =>{
    const countryCode = e.target.value;
    setCountry(countryCode)
  }
  return (
    <div className="app">
      <div className="app__header">
        <h1>Header</h1>
        <FormControl className="app_dropdown">
          <Select onChange={onCountryChage} variant="outlined" value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        
      </div>
    </div>
  );
}

export default App;
