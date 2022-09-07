import axios from 'axios';

const airPollutionURL = 'https://api.openweathermap.org/data/2.5';
const airPollutionKey = 'aafa8bdb6721fd796e15393dd7b376bf';
const getCountriesURL = 'https://restcountries.com/v3.1';

const airPollution = axios.create({
  baseURL: airPollutionURL,
  headers: {
    'Content-type': 'application/json',
  },
});

const getCountries = axios.create({
  baseURL: getCountriesURL,
  headers: {
    'Content-type': 'application/json',
  },
});

export {
  airPollution, airPollutionKey, getCountries,
};
