import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import LoginPage from './pages/loginPage';
import ProtectedRoute from './components/login/protectedRoute';
import DashboardPage from './pages/dashboardPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;