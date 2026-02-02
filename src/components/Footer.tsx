import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo light />
            <p className="text-background/70 text-sm">
              Your trusted marketplace for quality products and unbeatable value.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-background/70 hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                support@primemall.com
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                1-800-PRIME-MALL
              </li>
              <li className="flex items-start gap-2 text-background/70 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>123 Commerce Street<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2024 Prime Mall. All rights reserved.
          </p>
          <p className="text-background/50 text-xs">
            Powered by GenLayer Intelligent Contracts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
