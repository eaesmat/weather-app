import WorldService from '../../services/WorldService';

const GET_COUNTRIES = 'metrics/countries/GET_COUNTRIES';
const CLEAR = 'metrics/countries/CLEAR';

async function getCountries(dispatch, getState, continent) {
  const { pollution: currentData } = getState();
  if (Object.keys(currentData).length === 0 || currentData.continent !== continent) {
    const { data } = await WorldService.getContinentCountries(continent);
    const countries = data.map((country) => ({
      name: country.name.common,
      region: country.region,
      coords: country.latlng,
      population: country.population,
      flag: country.flags.svg,
    }));
    dispatch({ type: GET_COUNTRIES, payload: countries });
  }
}

function removeCountries(dispatch) {
  dispatch({ type: CLEAR });
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return action.payload;
    case CLEAR:
      return [];
    default:
      return state;
  }
}

export { getCountries, removeCountries };

// {
//   name: { common: 'Chile', official: 'Republic of Chile', nativeName:
// { spa: { official: 'República de Chile', common: 'Chile' } } },
//   tld: ['.cl'],
//   cca2: 'CL',
//   ccn3: '152',
//   cca3: 'CHL',
//   cioc: 'CHI',
//   independent: true,
//   status: 'officially-assigned',
//   unMember: true,
//   currencies: { CLP: { name: 'Chilean peso', symbol: '$' } },
//   idd: { root: '+5', suffixes: ['6'] },
//   capital: ['Santiago'],
//   altSpellings: ['CL', 'Republic of Chile', 'República de Chile'],
//   region: 'Americas',
//   subregion: 'South America',
//   languages: { spa: 'Spanish' },
//   translations: {
//      'stuff': []
//   },
//   latlng: [-30.0, -71.0],
//   landlocked: false,
//   borders: ['ARG', 'BOL', 'PER'],
//   area: 756102.0,
//   demonyms: { eng: { f: 'Chilean', m: 'Chilean' }, fra: { f: 'Chilienne', m: 'Chilien' } },
//   flag: '\uD83C\uDDE8\uD83C\uDDF1',
//   maps: { googleMaps: 'https://goo.gl/maps/XboxyNHh2fAjCPNn9',
// openStreetMaps: 'https://www.openstreetmap.org/relation/167454' },
//   population: 19116209,
//   gini: { 2017: 44.4 },
//   fifa: 'CHI',
//   car: { signs: ['RCH'], side: 'right' },
//   timezones: ['UTC-06:00', 'UTC-04:00'],
//   continents: ['South America'],
//   flags: { png: 'https://flagcdn.com/w320/cl.png', svg: 'https://flagcdn.com/cl.svg' },
//   coatOfArms: { png: 'https://mainfacts.com/media/images/coats_of_arms/cl.png', svg:
// 'https://mainfacts.com/media/images/coats_of_arms/cl.svg' },
//   startOfWeek: 'monday',
//   capitalInfo: { latlng: [-33.45, -70.67] },
//   postalCode: { format: '#######', regex: '^(\\d{7})$' },
// };
