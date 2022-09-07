const SET_CONTINENT = 'metrics/continent/SET_CONTINENT';

function setContinent(dispatch, continent) {
  dispatch({ type: SET_CONTINENT, payload: continent });
}

export default function reducer(state = 'Africa', action) {
  switch (action.type) {
    case SET_CONTINENT:
      return action.payload;
    default:
      return state;
  }
}

export { setContinent };
