import { Sun, CloudRain, Cloud, CloudSnow, CloudLightning } from 'lucide-react';

export const getWeatherIcon = (code: number, size: number = 24) => {
  // 0-1: Ясно
  if (code <= 1) return <Sun size={size} className="text-yellow-500" />;
  // 2-3: Хмарно
  if (code <= 3) return <Cloud size={size} className="text-gray-400" />;
  // 45-48: Туман
  if (code <= 48) return <Cloud size={size} className="text-gray-600" />;
  // 51-67: Дощ
  if (code <= 67) return <CloudRain size={size} className="text-blue-500" />;
  // 71-77: Сніг
  if (code <= 77) return <CloudSnow size={size} className="text-blue-200" />;
  // 80-82: Злива
  if (code <= 82) return <CloudRain size={size} className="text-blue-700" />;
  // 85-86: Снігопад
  if (code <= 86) return <CloudSnow size={size} className="text-gray-400" />;
  // 95-99: Гроза
  if (code <= 99) return <CloudLightning size={size} className="text-purple-500" />;
  
  return <Sun size={size} />;
};