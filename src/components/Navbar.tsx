import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Twitter, Instagram } from "lucide-react";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "SHOP", path: "/shop" },
  { name: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === "/";
  const showSocialIcons = isHomePage; // Only show social icons on home page
  const showUserMenu = !isHomePage; // Hide user menu on home page

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo light />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-white/90"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side - Social + User Menu */}
          <div className="hidden md:flex items-center gap-6">
            {showSocialIcons && (
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="text-white/80 hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            )}
            {showUserMenu && (
              <div className={showSocialIcons ? "border-l border-white/20 pl-6" : ""}>
                <UserMenu />
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {showUserMenu && <UserMenu />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors hover:text-primary px-4 py-2",
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-white/90"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {showSocialIcons && (
                <div className="flex items-center space-x-4 px-4 pt-4 border-t border-white/10">
                  <a
                    href="#"
                    className="text-white/80 hover:text-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-white/80 hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-white/80 hover:text-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
