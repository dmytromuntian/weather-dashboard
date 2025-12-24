import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from "../store/store";
import { getWeatherIcon } from '../utils/weatherUtils';
import { ArrowLeft, MapPin, Mail } from 'lucide-react';

export const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Знаходимо користувача в Store
  const user = useSelector((state: RootState) => 
    state.users.users.find(u => u.uuid === id)
  );

  // Обробка ситуації 
  if (!user) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl mb-4">User data not found (Please return to home)</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Go Home
        </button>
      </div>
    );
  }

  const { daily } = user.weather!;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 font-medium"
      >
        <ArrowLeft size={20} /> Back to List
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img 
          src={user.picture.large} 
          alt={user.name.first} 
          className="w-32 h-32 rounded-full border-4 border-indigo-100 shadow-sm"
        />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.name.first} {user.name.last}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-1">
            <MapPin size={18} />
            <span>{user.location.city}, {user.location.country}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>
          <div className="mt-4 inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
            {user.gender}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast</h2>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">High</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Low</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {daily.time.map((date, index) => (
                <tr key={date} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center">
                    {getWeatherIcon(daily.weathercode[index])}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-bold">
                    {daily.temperature_2m_max[index]}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {daily.temperature_2m_min[index]}°C
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};