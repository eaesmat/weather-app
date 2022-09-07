import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import unidecode from 'unidecode';

import { getCountries } from '../../redux/continentCountries/continentCountries';
import { setContinent } from '../../redux/continent/continent';
import { setCountry } from '../../redux/country/country';
import store from '../../redux/configureStore';

import Loading from '../loading/Loading';

import world from '../../assets/world.png';

import './Continents.css';

const Continents = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const continent = useSelector((state) => state.continent);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [query, setQuery] = useState('');
  const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const continentSelect = (e) => {
    setCountry(dispatch, {});
    setContinent(dispatch, e.target.value);
    getCountries(dispatch, store.getState, e.target.value);
  };
  const countrySelect = (country) => {
    setCountry(dispatch, country);
  };
  const filterSearch = (str) => {
    if (str === '') {
      return countries;
    }
    return countries.filter((country) => `${country.population}`.includes(parseInt(str, 10))
      || `${country.coords}`.includes(parseInt(str, 10))
      || unidecode(`${country.name}`).toLowerCase().includes(unidecode(str)));
  };

  useEffect(() => {
    setCountry(dispatch, {});
    setSearchedCountries(filterSearch(query));
  }, [countries, query]);

  useEffect(() => {
    getCountries(dispatch, store.getState, continent);
    setCountry(dispatch, {});
    setSearchedCountries(filterSearch(query));
  }, [continent]);

  return (
    <div className="countries">
      <img
        src={world}
        alt="Background world."
        style={
          {
            width: '100%',
            position: 'fixed',
            top: '35%',
            zIndex: '1',
          }
        }
      />
      <select
        value={continent}
        onChange={(e) => continentSelect(e)}
        className="select-continent"
      >
        {
          continents.map(
            (continent) => <option value={continent} key={continent}>{continent}</option>,
          )
        }
      </select>
      <input className="search-filter" value={query} placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
      <ul className="country-list">
        {searchedCountries && searchedCountries.map((country) => (
          <li className="country" key={country.name}>
            <NavLink
              to={`/continents/country/${unidecode(country.name.replace(/ /gi, '-'))}`}
              className="nav-link"
              onClick={() => countrySelect(country)}
            >
              <img alt={`${country.name}'s flag.`} src={country.flag} />
              <div className="country-info-small">
                <span>{country.name.toUpperCase()}</span>
                <span>{`Pop: ${country.population}`}</span>
              </div>
            </NavLink>
          </li>
        ))}
        {countries.length ? '' : <Loading />}
      </ul>
    </div>
  );
};

export default Continents;
