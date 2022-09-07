/* eslint-disable */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import pollution from '../redux/currentPollution/currentPollution';
import countries from '../redux/continentCountries/continentCountries';
import continent from '../redux/continent/continent';
import country from '../redux/country/country';

function render(
  ui,
  {
    preloadedState = {
      country: {
        name: 'Zimbabwe',
        region: 'Africa',
        coords: [
          -20,
          30,
        ],
        population: 14862927,
        flag: 'https://flagcdn.com/zw.svg',
      },
    },
    store = configureStore({
      reducer: {
        pollution,
        countries,
        continent,
        country,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
