import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks'; 
import { fetchUsersAndWeather } from '../store/userSlice';
import { UserCard } from '../components/UserCard';
import { Loader2, RefreshCcw, WifiOff } from 'lucide-react';

export const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  // Витягуємо дані зі стору 
  const { users, status, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsersAndWeather());
    }
  }, [status, dispatch]);

  // Стан завантаження
  if (status === 'loading') {
    return (
      <div className="flex flex-col h-screen justify-center items-center gap-4 bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
        <p className="text-gray-500 font-medium animate-pulse">Отримання даних користувачів та погоди...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6 px-4 text-center bg-gray-50">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-red-100 border border-red-50 max-w-md w-full">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <WifiOff className="text-red-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Помилка з'єднання</h2>
          <p className="text-gray-600 mb-6">
            {error || 'Не вдалося завантажити дані. Перевірте підключення до мережі.'}
          </p>
          <button 
            onClick={() => dispatch(fetchUsersAndWeather())}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-indigo-200"
          >
            <RefreshCcw size={18} />
            Спробувати ще раз
          </button>
        </div>
      </div>
    );
  }

  // Основний контент (Список)
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              User Weather Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Перегляд актуальної погоди для користувачів по всьому світу
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 self-start text-sm font-medium text-gray-600">
             Знайдено користувачів: <span className="text-indigo-600 font-bold">{users.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <UserCard key={user.uuid} user={user} />
          ))}
        </div>

        {users.length === 0 && status === 'succeeded' && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl">Користувачів не знайдено</p>
          </div>
        )}
      </div>
    </div>
  );
};