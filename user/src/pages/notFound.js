import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <section className="padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div style={{textAlign: 'center'}}>
                <div style={{marginBottom: '30px'}}>
                  <h1 style={{
                    fontSize: '120px',
                    fontWeight: 'bold',
                    color: '#e74c3c',
                    margin: 0,
                    lineHeight: 1
                  }}>
                    404
                  </h1>
                </div>

                <h2 style={{
                  fontSize: '40px',
                  marginBottom: '15px',
                  color: '#333'
                }}>
                  Oops! Page Not Found
                </h2>

                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  marginBottom: '30px',
                  maxWidth: '600px',
                  margin: '0 auto 30px'
                }}>
                  The page you are looking for doesn't exist or has been moved. 
                  Don't worry, we have plenty of delicious recipes waiting for you!
                </p>

                <div style={{
                  backgroundColor: '#f8f8f8',
                  padding: '30px',
                  borderRadius: '5px',
                  marginBottom: '30px'
                }}>
                  <div style={{marginBottom: '20px'}}>
                    <input
                      type="text"
                      placeholder="Search recipes..."
                      style={{
                        width: '100%',
                        padding: '15px 20px',
                        fontSize: '16px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <button style={{
                    padding: '12px 30px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    SEARCH
                  </button>
                </div>

                <div style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
                  <Link to="/dashboard" style={{
                    padding: '12px 30px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    <i className="fas fa-home"></i> BACK TO HOME
                  </Link>
                  <Link to="/blog" style={{
                    padding: '12px 30px',
                    backgroundColor: '#3498db',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    <i className="fas fa-newspaper"></i> VIEW RECIPES
                  </Link>
                  <Link to="/contact" style={{
                    padding: '12px 30px',
                    backgroundColor: '#27ae60',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    <i className="fas fa-envelope"></i> CONTACT US
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{backgroundColor: '#f8f8f8', padding: '60px 0'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3 style={{textAlign: 'center', marginBottom: '40px'}}>BROWSE OUR POPULAR CATEGORIES</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3" style={{marginBottom: '20px'}}>
              <Link to="/blog" style={{
                display: 'block',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '5px',
                textAlign: 'center',
                textDecoration: 'none',
                color: '#333',
                boxShadow: '0 0 10px rgba(0,0,0,0.05)'
              }}>
                <i className="fas fa-bread-slice" style={{fontSize: '40px', color: '#e74c3c', marginBottom: '15px', display: 'block'}}></i>
                <h4>Breakfast</h4>
                <p style={{color: '#666', fontSize: '14px'}}>Start your day right</p>
              </Link>
            </div>

            <div className="col-md-3" style={{marginBottom: '20px'}}>
              <Link to="/blog" style={{
                display: 'block',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '5px',
                textAlign: 'center',
                textDecoration: 'none',
                color: '#333',
                boxShadow: '0 0 10px rgba(0,0,0,0.05)'
              }}>
                <i className="fas fa-utensils" style={{fontSize: '40px', color: '#3498db', marginBottom: '15px', display: 'block'}}></i>
                <h4>Main Course</h4>
                <p style={{color: '#666', fontSize: '14px'}}>Delicious dinner ideas</p>
              </Link>
            </div>

            <div className="col-md-3" style={{marginBottom: '20px'}}>
              <Link to="/blog" style={{
                display: 'block',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '5px',
                textAlign: 'center',
                textDecoration: 'none',
                color: '#333',
                boxShadow: '0 0 10px rgba(0,0,0,0.05)'
              }}>
                <i className="fas fa-leaf" style={{fontSize: '40px', color: '#27ae60', marginBottom: '15px', display: 'block'}}></i>
                <h4>Salads</h4>
                <p style={{color: '#666', fontSize: '14px'}}>Healthy choices</p>
              </Link>
            </div>

            <div className="col-md-3" style={{marginBottom: '20px'}}>
              <Link to="/blog" style={{
                display: 'block',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '5px',
                textAlign: 'center',
                textDecoration: 'none',
                color: '#333',
                boxShadow: '0 0 10px rgba(0,0,0,0.05)'
              }}>
                <i className="fas fa-cookie" style={{fontSize: '40px', color: '#f39c12', marginBottom: '15px', display: 'block'}}></i>
                <h4>Desserts</h4>
                <p style={{color: '#666', fontSize: '14px'}}>Sweet treats</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
