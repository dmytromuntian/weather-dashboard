import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type User } from "../types";
import { getWeatherIcon } from '../utils/weatherUtils';

interface Props {
  user: User;
}

export const UserCard: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const currentTemp = user.weather?.current_weather?.temperature;
  const weatherCode = user.weather?.current_weather?.weathercode ?? 0;
  const minTemp = user.weather?.daily?.temperature_2m_min?.[0];
  const maxTemp = user.weather?.daily?.temperature_2m_max?.[0];

  const hasWeatherData = user.weather !== null && user.weather !== undefined;

  return (
    <div 
      onClick={() => navigate(`/user/${user.uuid}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden border border-gray-100 p-4 flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <img 
          src={user.picture.medium} 
          alt={user.name.first} 
          className="w-16 h-16 rounded-full border-2 border-indigo-100"
        />
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            {user.name.first} {user.name.last}
          </h3>
          <p className="text-sm text-gray-500">{user.location.city}, {user.location.country}</p>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg p-3 flex justify-between items-center">
        {hasWeatherData ? (
          <>
            <div className="flex items-center gap-2">
              {getWeatherIcon(weatherCode)}
              <span className="font-bold text-2xl">{currentTemp}°C</span>
            </div>
            <div className="text-xs text-gray-600 flex flex-col items-end">
              <span>Min: {minTemp}°</span>
              <span>Max: {maxTemp}°</span>
            </div>
          </>
        ) : (
          <span className="text-sm text-gray-400 w-full text-center">Погода недоступна</span>
        )}
      </div>
    </div>
  );
};