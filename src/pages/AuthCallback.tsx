import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const callbackUrl = new URL(window.location.href);
    const authError = callbackUrl.searchParams.get('error_description')
      ?? callbackUrl.searchParams.get('error')
      ?? new URLSearchParams(callbackUrl.hash.slice(1)).get('error_description');

    if (authError) {
      setError(authError);
      return () => {
        active = false;
      };
    }

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) {
        setError(sessionError.message);
      } else if (data.session) {
        navigate('/hero', { replace: true });
      } else {
        setError('No active session was returned. Please try signing in again.');
      }
    }).catch((sessionError: unknown) => {
      if (!active) return;
      setError(sessionError instanceof Error ? sessionError.message : 'Unable to complete sign-in.');
    });

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-6 font-body text-charcoal">
      <div className="max-w-lg text-center">
        {error ? (
          <>
            <p className="text-sm text-red-700" role="alert">{error}</p>
            <Link to="/login" className="mt-4 inline-block text-sm text-brass underline underline-offset-4">Return to sign in</Link>
          </>
        ) : (
          <p role="status">Completing sign-in...</p>
        )}
      </div>
    </main>
  );
}
