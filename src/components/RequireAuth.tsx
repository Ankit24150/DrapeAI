import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function RequireAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession);
        setCheckingSession(false);
      }
    });

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) {
        setError(sessionError.message);
      } else {
        setSession(data.session);
      }
      setCheckingSession(false);
    }).catch((sessionError: unknown) => {
      if (!active) return;
      setError(sessionError instanceof Error ? sessionError.message : 'Unable to verify your session.');
      setCheckingSession(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (checkingSession) {
    return <main className="grid min-h-screen place-items-center bg-canvas font-body text-charcoal">Checking your session...</main>;
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-canvas px-6 font-body text-charcoal">
        <p role="alert" className="max-w-lg text-center text-sm">We couldn’t verify your sign-in. Please reload and try again. <span className="block pt-2 text-xs">{error}</span></p>
      </main>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet context={session.user} />;
}
