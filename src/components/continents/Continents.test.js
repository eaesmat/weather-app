import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { setupServer } from 'msw/node';
import { screen, render } from '../../mocks/test-utils';
import Continents from './Continents';

import handlers from '../../mocks/handlers';

const server = setupServer(...handlers);

describe('Continents Component', () => {
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
    render(<BrowserRouter><Continents /></BrowserRouter>);
    expect(screen.getAllByText('Africa').length).toBeGreaterThan(0);
  });

  it('renders another continent with countries', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/continents']}><Continents /></MemoryRouter>);
    const select = await screen.findByRole('combobox');
    const continent2 = screen.getByText('Americas');
    await user.selectOptions(select, continent2);
    const mexico = screen.getByText(/mexico/i);
    expect(mexico).toBeInTheDocument();
  });
});
