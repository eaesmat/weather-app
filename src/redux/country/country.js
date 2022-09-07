const SET_COUNTRY = 'metrics/country/SET_COUNTRY';

function setCountry(dispatch, country) {
  const payload = country;
  if (Object.keys(country).length === 0) {
    payload.name = '';
  }
  dispatch({ type: SET_COUNTRY, payload });
}

export default function reducer(state = { name: '' }, action) {
  switch (action.type) {
    case SET_COUNTRY:
      return action.payload;
    default:
      return state;
  }
}

export { setCountry };
