import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Calculate password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^a-zA-Z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    // Simulate signup
    alert('Account created successfully! Redirecting to login...');
    navigate('/login');
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return '#ccc';
    if (passwordStrength === 1) return '#f39c12';
    if (passwordStrength === 2) return '#e67e22';
    if (passwordStrength === 3) return '#27ae60';
    return '#27ae60';
  };

  return (
    <>
      <section className="page-title-area" style={{backgroundImage: 'url(assets/img/slider/slider-2.jpg)', backgroundSize: 'cover'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-title-content">
                <h1 className="title">CREATE ACCOUNT</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div style={{
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '5px',
                boxShadow: '0 0 20px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{marginBottom: '15px', textAlign: 'center', fontSize: '28px'}}>
                  Join ChefCorner
                </h2>
                <p style={{textAlign: 'center', marginBottom: '30px', color: '#666'}}>
                  Create an account to save your favorite recipes and share your own
                </p>

                {error && (
                  <div style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    borderLeft: '4px solid #f5c6cb'
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{marginBottom: '20px'}}>
                    <label htmlFor="fullName" style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333'}}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>

                  <div style={{marginBottom: '20px'}}>
                    <label htmlFor="email" style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333'}}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>

                  <div style={{marginBottom: '20px'}}>
                    <label htmlFor="password" style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333'}}>
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                    {formData.password && (
                      <div style={{marginTop: '8px'}}>
                        <div style={{
                          height: '4px',
                          backgroundColor: '#eee',
                          borderRadius: '2px',
                          overflow: 'hidden',
                          marginBottom: '5px'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${(passwordStrength / 4) * 100}%`,
                            backgroundColor: getPasswordStrengthColor(),
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                        <small style={{color: '#666', fontSize: '12px'}}>
                          Password Strength: {passwordStrength === 0 ? 'Weak' : passwordStrength === 1 ? 'Fair' : passwordStrength === 2 ? 'Good' : 'Strong'}
                        </small>
                      </div>
                    )}
                  </div>

                  <div style={{marginBottom: '20px'}}>
                    <label htmlFor="confirmPassword" style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333'}}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>

                  <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'flex', alignItems: 'flex-start', marginBottom: 0}}>
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        style={{marginRight: '8px', marginTop: '4px', cursor: 'pointer'}}
                      />
                      <span style={{fontSize: '14px', color: '#666'}}>
                        I agree to the <a href="#" style={{color: '#e74c3c', textDecoration: 'none'}}>Terms and Conditions</a> and <a href="#" style={{color: '#e74c3c', textDecoration: 'none'}}>Privacy Policy</a>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      backgroundColor: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
                  >
                    CREATE ACCOUNT
                  </button>
                </form>

                <div style={{marginTop: '30px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px'}}>
                  <p style={{marginBottom: '0', color: '#666'}}>
                    Already have an account?{' '}
                    <Link to="/login" style={{color: '#e74c3c', textDecoration: 'none', fontWeight: '600'}}>
                      Login Here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
