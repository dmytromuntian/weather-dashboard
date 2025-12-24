import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User, UserState } from '../types';

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsersAndWeather = createAsyncThunk(
  'users/fetchUsersAndWeather',
  async (_, { rejectWithValue }) => {
    try {
      // 1. Завантажуємо юзерів
      const response = await axios.get('https://randomuser.me/api/?results=10');
      const rawUsers = response.data.results;

      // 2. Створюємо масив промісів для погоди
      const weatherPromises = rawUsers.map((user: any) => {
        const { latitude, longitude } = user.location.coordinates;
        return axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        );
      });

      const weatherResponses = await Promise.all(weatherPromises);

      // 4. Об'єднуємо дані
      const mergedUsers: User[] = rawUsers.map((user: any, index: number) => ({
        uuid: user.login.uuid, 
        name: user.name,
        email: user.email,
        gender: user.gender,
        picture: user.picture,
        location: user.location,
        weather: weatherResponses[index].data,
      }));

      return mergedUsers;
    } catch (err) {
      return rejectWithValue('Failed to fetch data');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAndWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAndWeather.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsersAndWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;