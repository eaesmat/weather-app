import WorldService from '../../services/WorldService';

const GET_POLLUTION = 'metrics/pollution/GET_POLLUTION';
const CLEAR = 'metrics/pollution/CLEAR';

async function getCurrentPollution(dispatch, getState) {
  const { country } = getState();
  const { data } = await WorldService.getCurrentPollutionData(
    ...country.coords,
  );
  const payload = {
    ...data.coord,
    composition: data.list[0].components,
    index: data.list[0].main.aqi,
    dt: data.list[0].dt,
  };
  dispatch({ type: GET_POLLUTION, payload });
}

function removePollutionData(dispatch) {
  dispatch({ type: CLEAR });
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_POLLUTION:
      return action.payload;
    case CLEAR:
      return {};
    default:
      return state;
  }
}

export { getCurrentPollution, removePollutionData };

// {
//   "coord": [
//     50.0,
//     50.0
//   ],
//   "list": [
//     {
//       "dt": 1606147200,
//       "main": {
//         "aqi": 4.0
//       },
//       "components": {
//         "co": 203.609,
//         "no": 0.0,
//         "no2": 0.396,
//         "o3": 75.102,
//         "so2": 0.648,
//         "pm2_5": 23.253,
//         "pm10": 92.214,
//         "nh3": 0.117
//       }
//     }
//   ]
// }
