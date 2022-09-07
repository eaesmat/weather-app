import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCountry } from '../../redux/country/country';
import { getCurrentPollution, removePollutionData } from '../../redux/currentPollution/currentPollution';
import Damage from '../damage/Damage';
import Loading from '../loading/Loading';

import './Country.css';

const Country = () => {
  const dispatch = useDispatch();
  const continent = useSelector((state) => state.continent);
  const country = useSelector((state) => state.country);
  const pollution = useSelector((state) => state.pollution);
  const countrySelect = (country) => {
    setCountry(dispatch, country);
  };
  const back = () => {
    countrySelect({});
    removePollutionData(dispatch);
  };
  // const status = {
  //   1: ['Good', '#0f0'],
  //   2: ['Fair', '#66ff00'],
  //   3: ['Moderate', '#eeff00'],
  //   4: ['Poor', '#ff7300'],
  //   5: ['Very Poor', '#ff0000'],
  // };

  useEffect(() => {
    dispatch(getCurrentPollution);
    dispatch(removePollutionData);
  }, []);

  return (
    <div className="country-info">
      <div className="return">
        <NavLink
          to="/continents"
          onClick={back}
        >
          <span className="continent-btn">{continent}</span>
        </NavLink>
        <span className="country-path">{` > ${country.name}`}</span>
      </div>
      <div
        className="data"
        style={
          { display: 'flex', flexDirection: 'column' }
        }
      >
        <span className="datetime">{new Date(pollution.dt * 1000).toLocaleString()}</span>
        <span>{`Population: ${country.population}`}</span>
        <img className="country-flag" alt={`${country.name}'s flag.`} src={country.flag} />
        {pollution && Object.keys(pollution).length > 0
          ? (
            <div className="pollution-data">
              <span
                className="status"
                style={{
                }}
              />
              <ul className="compounds">
                {Object.keys(pollution.composition).map((key) => {
                  const compound = key.replace('_', '.');
                  const cmpndName = compound.replace(/[0-9]/g, '').replace('.', '').toUpperCase();
                  const cmpndNumb = compound.replace(/[a-z]/g, '');
                  return (
                    <li className="compound" key={key}>
                      <span>
                        {cmpndName}
                        <sub>{cmpndNumb}</sub>
                      </span>
                      <span>
                        {pollution.composition[key]}
                        <small>
                          &#181;g/m
                          <sup>3</sup>
                        </small>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
          : (<Loading />)}
      </div>
      {pollution && Object.keys(pollution).length > 0
        ? <Damage intensity={parseInt(pollution.index, 10)} />
        : <></>}
    </div>
  );
};

export default Country;
