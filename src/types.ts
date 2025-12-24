export interface WeatherDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
  daily: WeatherDaily;
}

export interface User {
  uuid: string;
  name: { first: string; last: string };
  email: string;
  gender: string;
  picture: { large: string; medium: string };
  location: {
    city: string;
    country: string;
    coordinates: { latitude: string; longitude: string };
  };
  // Це поле ми додамо після злиття даних
  weather?: WeatherData;
}

export interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}