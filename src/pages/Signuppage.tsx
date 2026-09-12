import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import GoogleButton from '../components/GoogleButton';

function getPasswordFeedback(password: string) {
  const checks = [
    { label: '8+ characters', valid: password.length >= 8 },
    { label: 'one uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'one number', valid: /\d/.test(password) },
    { label: 'one special character', valid: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((check) => check.valid).length;
  const label = password.length === 0 ? 'Add a password' : score <= 1 ? 'Weak password' : score <= 3 ? 'Almost there' : 'Strong password';
  const color = password.length === 0 ? 'bg-stone' : score <= 1 ? 'bg-red-400' : score <= 3 ? 'bg-amber-400' : 'bg-emerald-600';
  const suggestion = checks.find((check) => !check.valid)?.label;
  return { checks, score, label, color, suggestion };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const passwordFeedback = getPasswordFeedback(password);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address, like you@example.com.');
      return;
    }
    if (form.get('password') !== form.get('confirmPassword')) {
      setError("Those passwords don't match yet.");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    navigate('/hero', { state: { name: form.get('name'), email } });
  }

  function handleGoogleSignup() {
    navigate('/hero', { state: { name: 'Google member', email: 'Google account' } });
  }

  return (
    <AuthLayout
      eyebrow="Create your account"
      title={<>Make room for<br />what's next.</>}
      description="Create your private fitting room and see your next outfit before you buy it."
    >
      <GoogleButton label="Sign up with Google" onClick={handleGoogleSignup} />
      <div className="my-5 flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.15em] text-charcoal/60"><span className="h-px flex-1 bg-stone" />or<span className="h-px flex-1 bg-stone" /></div>
      <form onSubmit={handleSubmit} className="auth-signup-form flex flex-col gap-3" noValidate>
        <label className="flex flex-col gap-2 font-body text-[12px] text-charcoal"><span>Full name</span><input className="auth-input" name="name" type="text" required placeholder="Your name" autoComplete="name" /></label>
        <label className="flex flex-col gap-2 font-body text-[12px] text-charcoal"><span>Email address</span><input className="auth-input" name="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" />{email && <span className={`text-[11px] ${isValidEmail(email) ? 'text-emerald-700' : 'text-charcoal/70'}`}>{isValidEmail(email) ? 'Email looks good.' : 'Please enter a complete email address.'}</span>}</label>
        <label className="flex flex-col gap-2 font-body text-[12px] text-charcoal"><span>Password</span><input className="auth-input" name="password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" autoComplete="new-password" minLength={8} />
          <span className="mt-1 flex items-center gap-2 normal-case tracking-normal"><span className="flex h-1.5 flex-1 gap-1">{[0, 1, 2, 3].map((segment) => <span key={segment} className={`h-full flex-1 rounded-full ${segment < passwordFeedback.score ? passwordFeedback.color : 'bg-stone'}`} />)}</span><strong className="font-body text-[11px] font-medium text-charcoal">{passwordFeedback.label}</strong></span>
          <span className="normal-case tracking-normal text-[11px] text-charcoal/70">{passwordFeedback.suggestion ? `Suggestion: add ${passwordFeedback.suggestion}.` : 'Nice. This password meets all the basic checks.'}</span>
        </label>
        <label className="flex flex-col gap-2 font-body text-[12px] text-charcoal"><span>Confirm password</span><input className="auth-input" name="confirmPassword" type="password" required placeholder="Type it again" autoComplete="new-password" minLength={8} /></label>
        <label className="mt-1 flex items-start gap-2 font-body text-[12px] leading-relaxed text-charcoal"><input type="checkbox" required className="mt-1 accent-brass" /><span>I agree to the <a href="/terms" className="text-brass hover:text-ink">Terms of Service</a> and <a href="/privacy" className="text-brass hover:text-ink">Privacy Policy</a>.</span></label>
        {error && <p className="font-body text-[12px] text-red-700" role="alert">{error}</p>}
        <button type="submit" disabled={loading} className="auth-submit mt-2 w-full rounded-full bg-ink px-5 py-3.5 font-body text-[14px] text-canvas transition-colors hover:bg-brass disabled:opacity-60">{loading ? 'Creating account...' : 'Create account'}</button>
      </form>
      <p className="mt-5 text-center font-body text-[13px] text-charcoal">Already have an account? <Link to="/login" className="font-medium text-ink underline decoration-stoneDark underline-offset-4 hover:text-brass">Sign in</Link></p>
    </AuthLayout>
  );
}
