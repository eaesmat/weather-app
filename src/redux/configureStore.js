import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import pollution from './currentPollution/currentPollution';
import countries from './continentCountries/continentCountries';
import continent from './continent/continent';
import country from './country/country';

const rootReducer = combineReducers({
  pollution,
  countries,
  continent,
  country,
});
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
