import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import GoogleButton from '../components/GoogleButton';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address, like you@example.com.');
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    navigate('/hero', { state: { email } });
  }

  function handleGoogleLogin() {
    navigate('/hero', { state: { email: 'Google account' } });
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title={<>Return to your<br />fitting room.</>}
      description="Sign in to pick up where you left off and keep exploring your next look."
    >
      <GoogleButton label="Continue with Google" onClick={handleGoogleLogin} />
      <div className="my-7 flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.15em] text-charcoal/60"><span className="h-px flex-1 bg-stone" />or<span className="h-px flex-1 bg-stone" /></div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <label className="flex flex-col gap-2 font-body text-[12px] text-charcoal"><span>Email address</span><input className="auth-input" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" />{email && <span className={`text-[11px] ${isValidEmail(email) ? 'text-emerald-700' : 'text-charcoal/70'}`}>{isValidEmail(email) ? 'Email looks good.' : 'Please enter a complete email address.'}</span>}</label>
        <label className="flex flex-col gap-2 font-body text-[12px] text-charcoal"><span>Password</span><input className="auth-input" type="password" required placeholder="Your password" autoComplete="current-password" minLength={8} /></label>
        <div className="flex items-center justify-between font-body text-[12px] text-charcoal"><label className="flex items-center gap-2"><input type="checkbox" className="accent-brass" /> Keep me signed in</label><a href="#forgot" className="text-brass hover:text-ink transition-colors">Forgot password?</a></div>
        {error && <p className="font-body text-[12px] text-red-700" role="alert">{error}</p>}
        <button type="submit" disabled={loading} className="auth-submit mt-2 w-full rounded-full bg-ink px-5 py-3.5 font-body text-[14px] text-canvas transition-colors hover:bg-brass disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
      <p className="mt-7 text-center font-body text-[13px] text-charcoal">New to DrapeAI? <Link to="/signup" className="font-medium text-ink underline decoration-stoneDark underline-offset-4 hover:text-brass">Create an account</Link></p>
    </AuthLayout>
  );
}
