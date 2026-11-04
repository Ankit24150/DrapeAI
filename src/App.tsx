import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signuppage';
import AuthCallback from './pages/AuthCallback';
import HeroPage from './pages/HeroPage';
import RequireAuth from './components/RequireAuth';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<RequireAuth />}>
        <Route path="/hero" element={<HeroPage />} />
      </Route>
    </Routes>
  );
}
