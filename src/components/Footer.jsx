import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">

            {/* About col */}
            <div className="footer-about">
              <div className="footer-logo">
                <Link to="/" className="logo-link">
                  <span className="logo-badge">
                    <span className="logo-rts">
                      <span className="r">R</span>
                      <span className="t">T</span>
                      <span className="s">S</span>
                    </span>
                  </span>
                  <span className="logo-text-block">
                    <span className="logo-name">
                      Rahimi <span>Tech</span> Solution
                    </span>
                    <span className="logo-tagline">Software Development</span>
                  </span>
                </Link>
              </div>
              <p>We build software and IT systems for businesses, hospitals, schools, and government offices across Afghanistan. Founded in Jalalabad in 2015. Now serving clients on two continents.</p>
              <ul className="footer-offices">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <a href="https://www.google.com/maps/search/?api=1&query=34.43080279832595%2C70.46200933493083" target="_blank" rel="noopener noreferrer">
                    <strong>Afghanistan Office:</strong> Mia Aslam Plaza, Jalalabad City
                  </a>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <a href="https://www.google.com/maps/search/?api=1&query=49.159892907302%2C-123.14520339324754" target="_blank" rel="noopener noreferrer">
                    <strong>Canada Address:</strong> 7297 Moffatt Road, Richmond BC
                  </a>
                </li>
              </ul>
              <ul className="social-links">
                <li><a href="https://www.facebook.com/profile.php?id=61574393292441" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="https://www.facebook.com/profile.php?id=61574393292441" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
                <li><a href="https://www.linkedin.com/in/rahimi-tech-solution-a75796403/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a></li>
                <li><a href="https://www.linkedin.com/in/rahimi-tech-solution-a75796403/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a></li>
              </ul>
            </div>

            {/* Software Dev col */}
            <div className="footer-col">
              <h5>Software Development</h5>
              <ul>
                <li><Link to="/services">Web Application Development</Link></li>
                <li><Link to="/services">Custom Software Development</Link></li>
                <li><Link to="/services">Enterprise Web Solutions</Link></li>
                <li><Link to="/services">eCommerce Development</Link></li>
                <li><Link to="/services">Full Stack Development</Link></li>
                <li><Link to="/services">AI-Based Development</Link></li>
                <li><Link to="/services">Mobile App Development</Link></li>
              </ul>
            </div>

            {/* Enterprise Solutions col */}
            <div className="footer-col">
              <h5>Enterprise Solutions</h5>
              <ul>
                <li><Link to="/services">Government &amp; Public Portals</Link></li>
                <li><Link to="/services">Hospital Management Systems</Link></li>
                <li><Link to="/services">School Management Systems</Link></li>
                <li><Link to="/services">Banking &amp; Finance Software</Link></li>
                <li><Link to="/services">NGO &amp; Organization Systems</Link></li>
                <li><Link to="/services">ERP &amp; CRM Solutions</Link></li>
                <li><Link to="/services">Logistics &amp; Supply Chain</Link></li>
              </ul>
            </div>

            {/* Quick Links col */}
            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/team">Our Team</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/testimonials">Testimonials</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/terms">Terms &amp; Conditions</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>

          <div className="footer-member">
            <p>🇦🇫 Proudly serving Afghanistan and clients around the world</p>
          </div>

          <div className="footer-bottom">
            <ul className="social-links">
              <li><a href="https://www.facebook.com/profile.php?id=61574393292441" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61574393292441" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
              <li><a href="https://www.linkedin.com/in/rahimi-tech-solution-a75796403/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a></li>
              <li><a href="https://www.linkedin.com/in/rahimi-tech-solution-a75796403/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a></li>
            </ul>
            <ul className="contact-info">
              <li><i className="fas fa-phone-alt"></i><a href="tel:+93767617184">+93 (767) 617-184</a></li>
              <li><i className="fab fa-whatsapp"></i><a href="https://wa.me/93767617184?text=Hello%20Rahimi%20Tech%20Solution%2C%20I%20would%20like%20to%20connect%20with%20you." target="_blank" rel="noopener noreferrer">+93 (767) 617-184</a></li>
              <li><i className="fas fa-envelope"></i><a href="mailto:info@rahimitechsolution.com">info@rahimitechsolution.com</a></li>
              <li><i className="fas fa-map-marker-alt"></i><a href="https://www.google.com/maps/search/?api=1&query=34.43080279832595%2C70.46200933493083" target="_blank" rel="noopener noreferrer">Mia Aslam Plaza, Jalalabad City</a></li>
            </ul>
          </div>

        </div>
      </div>
      <div className="footer-copy">
        <div className="container">
          <span>Copyright &copy; Rahimi Tech Solution {new Date().getFullYear()} | Afghanistan&apos;s Premier Software House | <a href="https://rahimitechsolution.com">rahimitechsolution.com</a></span>
        </div>
      </div>
    </footer>
  )
}
