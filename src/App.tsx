import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signuppage'));
const HeroPage = lazy(() => import('./pages/HeroPage'));

export default function App() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center bg-canvas font-body text-charcoal">Loading...</main>}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hero" element={<HeroPage />} />
      </Routes>
    </Suspense>
  );
}
