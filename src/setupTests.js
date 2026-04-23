// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import WeatherPanel from './WeatherPanel';

// Import your reducers
import weatherReducer from '../src/features/weather/weatherSlice';

function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };


test('renders WeatherPanel', () => {
  renderWithProviders(<WeatherPanel />);

  expect(screen.getByText(/weather/i)).toBeInTheDocument();
});

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { weather: weatherReducer },
      preloadedState,
    })(<WeatherPanel />, {
  preloadedState: {
    weather: { city: 'London', temp: 12, status: 'Cloudy' }
  }
});