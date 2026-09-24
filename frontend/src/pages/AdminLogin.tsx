import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin, formatApiError } from '../services/api';
import { Shield, Lock, Mail, AlertCircle, Loader2, ArrowLeft, Info } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@dronetv.in');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please provide both administrator email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginAdmin({ email: email.trim(), password });
      navigate('/admin');
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card-box">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Homepage</span>
        </Link>

        <div className="login-header">
          <div className="login-icon-badge">
            <Shield size={28} />
          </div>
          <h1 className="login-title">Administrator Access</h1>
          <p className="login-subtitle">
            Secure management portal for DroneTV leads and customer inquiries.
          </p>
        </div>

        {error && (
          <div className="alert alert-error" role="alert">
            <AlertCircle size={18} className="alert-icon" />
            <div className="alert-content">
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Admin Email
            </label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="admin@dronetv.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                id="login-password"
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="spinner" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="demo-credentials-note">
          <Info size={16} className="note-icon" />
          <div>
            <strong>Evaluation Demo Credentials:</strong>
            <p>Email: <code>admin@dronetv.in</code></p>
            <p>Password: <code>Admin@123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
