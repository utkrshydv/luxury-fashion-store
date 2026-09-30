import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">MAISON</span>
          <p className="footer__tagline">Crafted with intention.</p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <p className="footer__col-title">Collections</p>
            {["Men","Women","Kids","Accessories"].map((c) => (
              <Link key={c} to={`/collection/${c}`} className="footer__link">{c}</Link>
            ))}
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Customer Care</p>
            <span className="footer__link">Shipping & Returns</span>
            <span className="footer__link">Size Guide</span>
            <span className="footer__link">Contact Us</span>
            <span className="footer__link">Store Locator</span>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Maison</p>
            <span className="footer__link">About</span>
            <span className="footer__link">Journal</span>
            <span className="footer__link">Careers</span>
            <Link to="/orders" className="footer__link">My Orders</Link>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; 2026 Maison. All rights reserved.</p>
          <div className="footer__legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
