import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather } from '../../api';

// UK-style date in GMT
function formatDate(now = new Date()) {
  return now.toLocaleDateString('en-GB', {
    timeZone: 'Etc/UTC',
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

// UK-style time in GMT
function formatTime(now = new Date()) {
  return now.toLocaleTimeString('en-GB', {
    timeZone: 'Etc/UTC',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Thunk: load real weather from OpenWeather
export const loadWeather = createAsyncThunk(
  'weather/loadWeather',
  async (city = 'Evesham,GB') => {
    const data = await fetchCurrentWeather(city);

    const tempC = Math.round(data.main.temp);
    const tempF = Math.round((tempC * 9) / 5 + 32);
    // condition = OWM main (e.g. "Clouds", "Rain") — used for CSS classes & icon maps
    const condition = data.weather?.[0]?.main || 'Unknown';
    // description = OWM description (e.g. "broken clouds") — used for display text
    const description = data.weather?.[0]?.description || '';
    const cityName = `${data.name}, ${data.sys?.country || ''}`.trim();

    return {
      city: cityName,
      tempC,
      tempF,
      condition,
      description,
      detail: `Feels like ${Math.round(
        data.main.feels_like
      )} °C • Humidity ${data.main.humidity}%`,
      // include the icon code from the API
      icon: data.weather?.[0]?.icon || "01d",
    };

  }

);

const now = new Date();

const initialState = {
  city: 'Loading weather…',
  tempC: 0,
  tempF: 32,
  condition: 'Unknown',
  description: '',
  detail: '',
  date: formatDate(now),
  time: formatTime(now),
  status: 'idle',
  error: null,
  icon: "01d",
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    tickTime(state) {
      const now = new Date();
      state.time = formatTime(now);
      state.date = formatDate(now);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWeather.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.city = action.payload.city;
        state.tempC = action.payload.tempC;
        state.tempF = action.payload.tempF;
        state.condition = action.payload.condition;
        state.description = action.payload.description;
        state.detail = action.payload.detail;
        state.icon = action.payload.icon;
      })
      .addCase(loadWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load weather';
      });
  },
});
export const { tickTime } = weatherSlice.actions;
export default weatherSlice.reducer;
