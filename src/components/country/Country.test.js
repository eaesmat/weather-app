import { setupServer } from 'msw/node';
import {
  BrowserRouter, MemoryRouter, Routes, Route,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {
  screen, render,
} from '../../mocks/test-utils';
import '@testing-library/jest-dom';

import Country from './Country';

import handlers from '../../mocks/handlers';

const server = setupServer(...handlers);

describe('Country Component', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders correctly', () => {
    render(<BrowserRouter><Country /></BrowserRouter>);
    const population = screen.getByText(/Population/i);
    expect(population).toBeInTheDocument();
  });

  it('fetches data correctly', async () => {
    render(<BrowserRouter><Country /></BrowserRouter>);

    const list = await screen.findByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBeGreaterThan(0);
  });

  it('returns to previous page', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/continents/country/Zimbabwe']}>
        <Routes>
          <Route path="/continents/country/Zimbabwe" element={<Country />} />
          <Route path="/continents" element={<div>Test</div>} />
        </Routes>
      </MemoryRouter>,
    );
    let population = screen.getByText(/Population/i);
    expect(population).toBeInTheDocument();
    const continent = screen.getByText(/Africa/i);
    await user.click(continent.parentElement);
    population = screen.queryByText(/Population/i);
    expect(population).toBeNull();
  });
});
