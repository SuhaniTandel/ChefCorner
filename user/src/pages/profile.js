import React, { useState } from 'react';

function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState({
    name: 'John Carter',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    bio: 'Food enthusiast and passionate home cook',
    location: 'New York, USA',
    joinDate: 'March 2024'
  });

  const myRecipes = [
    {
      id: 1,
      title: 'Chocolate Chip Cookies',
      category: 'DESSERT',
      image: 'assets/img/product/product1.jpg',
      views: 234,
      saves: 45
    },
    {
      id: 2,
      title: 'Grilled Salmon',
      category: 'MAIN COURSE',
      image: 'assets/img/product/product2.jpg',
      views: 567,
      saves: 89
    },
    {
      id: 3,
      title: 'Caesar Salad',
      category: 'APPETIZER',
      image: 'assets/img/product/product3.jpg',
      views: 345,
      saves: 67
    }
  ];

  const savedRecipes = [
    {
      id: 1,
      title: 'Pasta Carbonara',
      category: 'MAIN COURSE',
      author: 'Chef Maria',
      image: 'assets/img/product/product4.jpg'
    },
    {
      id: 2,
      title: 'Tiramisu',
      category: 'DESSERT',
      author: 'Chef Antonio',
      image: 'assets/img/product/product5.jpg'
    },
    {
      id: 3,
      title: 'Pad Thai',
      category: 'MAIN COURSE',
      author: 'Chef Sorn',
      image: 'assets/img/product/product6.jpg'
    }
  ];

  return (
    <>
      <section className="page-title-area" style={{backgroundImage: 'url(assets/img/slider/slider-3.jpg)', backgroundSize: 'cover'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-title-content">
                <h1 className="title">MY PROFILE</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row gutters-60">
            <div className="col-lg-3">
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '30px',
                borderRadius: '5px',
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: '#ddd',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-user" style={{fontSize: '50px', color: '#999'}}></i>
                </div>
                <h3>{userProfile.name}</h3>
                <p style={{color: '#666', marginBottom: '20px'}}>{userProfile.bio}</p>
                <button style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginBottom: '10px'
                }}>
                  Edit Profile
                </button>
                <button style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#95a5a6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Logout
                </button>
              </div>

              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '30px',
                borderRadius: '5px'
              }}>
                <h4 style={{marginBottom: '20px'}}>PROFILE INFO</h4>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{paddingBottom: '12px', borderBottom: '1px solid #ddd'}}>
                    <strong>Email:</strong><br/>
                    <span style={{color: '#666'}}>{userProfile.email}</span>
                  </li>
                  <li style={{paddingBottom: '12px', borderBottom: '1px solid #ddd', marginTop: '12px'}}>
                    <strong>Phone:</strong><br/>
                    <span style={{color: '#666'}}>{userProfile.phone}</span>
                  </li>
                  <li style={{paddingBottom: '12px', borderBottom: '1px solid #ddd', marginTop: '12px'}}>
                    <strong>Location:</strong><br/>
                    <span style={{color: '#666'}}>{userProfile.location}</span>
                  </li>
                  <li style={{paddingTop: '12px', marginTop: '12px'}}>
                    <strong>Member Since:</strong><br/>
                    <span style={{color: '#666'}}>{userProfile.joinDate}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-9">
              <div style={{borderBottom: '2px solid #e74c3c', marginBottom: '30px'}}>
                <button
                  onClick={() => setActiveTab('profile')}
                  style={{
                    padding: '15px 30px',
                    backgroundColor: activeTab === 'profile' ? '#e74c3c' : 'transparent',
                    color: activeTab === 'profile' ? '#fff' : '#333',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    marginRight: '20px'
                  }}
                >
                  PROFILE
                </button>
                <button
                  onClick={() => setActiveTab('recipes')}
                  style={{
                    padding: '15px 30px',
                    backgroundColor: activeTab === 'recipes' ? '#e74c3c' : 'transparent',
                    color: activeTab === 'recipes' ? '#fff' : '#333',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    marginRight: '20px'
                  }}
                >
                  MY RECIPES
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  style={{
                    padding: '15px 30px',
                    backgroundColor: activeTab === 'saved' ? '#e74c3c' : 'transparent',
                    color: activeTab === 'saved' ? '#fff' : '#333',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  SAVED RECIPES
                </button>
              </div>

              {activeTab === 'profile' && (
                <div>
                  <h3 style={{marginBottom: '30px'}}>Edit Profile Information</h3>
                  <form>
                    <div className="row" style={{marginBottom: '20px'}}>
                      <div className="col-md-6">
                        <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Full Name</label>
                        <input type="text" defaultValue={userProfile.name} style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          boxSizing: 'border-box'
                        }} />
                      </div>
                      <div className="col-md-6">
                        <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Email</label>
                        <input type="email" defaultValue={userProfile.email} style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          boxSizing: 'border-box'
                        }} />
                      </div>
                    </div>

                    <div className="row" style={{marginBottom: '20px'}}>
                      <div className="col-md-6">
                        <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Phone</label>
                        <input type="tel" defaultValue={userProfile.phone} style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          boxSizing: 'border-box'
                        }} />
                      </div>
                      <div className="col-md-6">
                        <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Location</label>
                        <input type="text" defaultValue={userProfile.location} style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          boxSizing: 'border-box'
                        }} />
                      </div>
                    </div>

                    <div style={{marginBottom: '20px'}}>
                      <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Bio</label>
                      <textarea defaultValue={userProfile.bio} rows="4" style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
                      }}></textarea>
                    </div>

                    <button type="button" style={{
                      padding: '12px 30px',
                      backgroundColor: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}>
                      SAVE CHANGES
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'recipes' && (
                <div>
                  <h3 style={{marginBottom: '20px'}}>My Recipes</h3>
                  <div className="row">
                    {myRecipes.map(recipe => (
                      <div key={recipe.id} className="col-md-4" style={{marginBottom: '30px'}}>
                        <div style={{
                          backgroundColor: '#f8f8f8',
                          borderRadius: '5px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <img src={recipe.image} alt={recipe.title} style={{width: '100%', height: '200px', objectFit: 'cover'}} />
                          <div style={{padding: '15px'}}>
                            <h5 style={{marginBottom: '10px'}}>{recipe.title}</h5>
                            <p style={{fontSize: '12px', color: '#999', marginBottom: '10px'}}>{recipe.category}</p>
                            <div style={{fontSize: '12px', color: '#666', marginBottom: '15px'}}>
                              <span><i className="fas fa-eye"></i> {recipe.views} views</span><br/>
                              <span><i className="fas fa-heart"></i> {recipe.saves} saves</span>
                            </div>
                            <button style={{
                              width: '100%',
                              padding: '8px',
                              backgroundColor: '#e74c3c',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              marginBottom: '5px'
                            }}>
                              EDIT
                            </button>
                            <button style={{
                              width: '100%',
                              padding: '8px',
                              backgroundColor: '#95a5a6',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}>
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'saved' && (
                <div>
                  <h3 style={{marginBottom: '20px'}}>Saved Recipes</h3>
                  <div className="row">
                    {savedRecipes.map(recipe => (
                      <div key={recipe.id} className="col-md-4" style={{marginBottom: '30px'}}>
                        <div style={{
                          backgroundColor: '#f8f8f8',
                          borderRadius: '5px',
                          overflow: 'hidden'
                        }}>
                          <img src={recipe.image} alt={recipe.title} style={{width: '100%', height: '200px', objectFit: 'cover'}} />
                          <div style={{padding: '15px'}}>
                            <h5 style={{marginBottom: '10px'}}>{recipe.title}</h5>
                            <p style={{fontSize: '12px', color: '#999', marginBottom: '5px'}}>{recipe.category}</p>
                            <p style={{fontSize: '12px', color: '#666', marginBottom: '15px'}}>by {recipe.author}</p>
                            <button style={{
                              width: '100%',
                              padding: '8px',
                              backgroundColor: '#e74c3c',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              marginBottom: '5px'
                            }}>
                              VIEW RECIPE
                            </button>
                            <button style={{
                              width: '100%',
                              padding: '8px',
                              backgroundColor: '#95a5a6',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}>
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
