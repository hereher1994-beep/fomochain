'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface LoginForm {
  email: string;
  password: string;
}

const MOCK_CREDENTIALS = {
  email: 'admin@mitchrobinhood.app',
  password: 'MitchRobinhood2026!',
};

export default function AdminLoginClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    setAuthError('');
    // BACKEND INTEGRATION: POST /api/admin/auth with { email, password }
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (
      data.email === MOCK_CREDENTIALS.email &&
      data.password === MOCK_CREDENTIALS.password
    ) {
      // In production: set session cookie / JWT here
      router.push('/admin-panel');
    } else {
      setAuthError('Invalid credentials — use the demo accounts below to sign in');
    }
    setIsSubmitting(false);
  };

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAutofill = () => {
    setValue('email', MOCK_CREDENTIALS.email);
    setValue('password', MOCK_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AppLogo size={40} />
            <div>
              <div className="text-xl font-black gradient-text-green">Mitch Robinhood App</div>
              <div className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="glass-card neon-border-green rounded-2xl p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-foreground mb-1">Admin Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Restricted access — Mitch Robinhood App administrators only
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Auth Error */}
            {authError && (
              <div className="px-4 py-3 rounded-xl bg-loss/10 border border-loss/30 text-loss text-sm flex items-start gap-2">
                <Icon name="ExclamationTriangleIcon" size={16} className="shrink-0 mt-0.5" />
                {authError}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="admin@mitchrobinhood.app"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-loss text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                </button>
              </div>
              {errors.password && (
                <p className="text-loss text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3.5 rounded-xl text-base font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <Icon name="ShieldCheckIcon" size={16} />
                  Sign In to Admin
                </>
              )}
            </button>
          </form>

          {/* Mock Credentials Box */}
          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Demo Credentials
              </div>
              <button
                onClick={handleAutofill}
                className="text-xs text-primary hover:underline font-semibold"
              >
                Autofill →
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm font-mono text-foreground">{MOCK_CREDENTIALS.email}</div>
                </div>
                <button
                  onClick={() => handleCopy(MOCK_CREDENTIALS.email, 'email')}
                  className="text-muted-foreground hover:text-primary transition-colors p-1 shrink-0"
                  title="Copy email"
                >
                  <Icon name={copiedField === 'email' ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={14} />
                </button>
              </div>
              <div className="border-t border-border pt-2 flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">Password</div>
                  <div className="text-sm font-mono text-foreground">{MOCK_CREDENTIALS.password}</div>
                </div>
                <button
                  onClick={() => handleCopy(MOCK_CREDENTIALS.password, 'password')}
                  className="text-muted-foreground hover:text-primary transition-colors p-1 shrink-0"
                  title="Copy password"
                >
                  <Icon name={copiedField === 'password' ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Not an admin?{' '}
          <a href="/" className="text-primary hover:underline">
            Back to Mitch Robinhood App →
          </a>
        </p>
      </div>
    </div>
  );
}