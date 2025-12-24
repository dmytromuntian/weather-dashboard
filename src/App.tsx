import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { UserList } from './pages/UserList';
import { UserDetail } from './pages/UserDetail';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;