import React from 'react';

function Footer(){
  return(
    <>
      <footer className="ranna-bg-dark">
            <div className="container">
                <div className="footer-logo">
                    <a href="/"><img src="assets/img/ChefCorner-logo.png" className="img-fluid" alt="footer-logo"/></a>
                </div>
                <div className="footer-menu">
                    <ul>
                        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">FACEBOOK</a></li>
                        <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">TWITTER</a></li>
                        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
                        <li><a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">PINTEREST</a></li>
                        <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YOUTUBE</a></li>
                    </ul>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 ChefCorner. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </>
  );
}

export default Footer;