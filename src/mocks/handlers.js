import { rest } from 'msw';

const handlers = [
  rest.get(/africa/i, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(
      [
        {
          flags: {
            svg: 'algo',
          },
          name: {
            common: 'Zimbabwe',
          },
          latlng: [
            32,
            -5,
          ],
          population: 69420,
          region: 'Africa',
        },
      ],
    ),
  )),
  rest.get(/americas/i, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(
      [
        {
          flags: {
            svg: 'algo',
          },
          name: {
            common: 'Mexico',
          },
          latlng: [
            37.0,
            127.5,
          ],
          population: 69420,
          region: 'Africa',
        },
      ],
    ),
  )),
  rest.get(/air_pollution/i, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(
      {
        coord: [
          50.0,
          50.0,
        ],
        list: [
          {
            dt: 1606147200,
            main: {
              aqi: 4.0,
            },
            components: {
              co: 203.609,
              no: 0.0,
              no2: 0.396,
              o3: 75.102,
              so2: 0.648,
              pm2_5: 23.253,
              pm10: 92.214,
              nh3: 0.117,
            },
          },
        ],
      },
    ),
  )),
];

export default handlers;
