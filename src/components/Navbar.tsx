import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Truck, User, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/track", label: "Track Order" },
    { to: "/about", label: "About" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <Wheat className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">
            Grain<span className="text-primary">Dispatch</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
          </Link>

          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.displayName || user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="w-4 h-4" /> Login
              </Button>
            </Link>
          )}

          <Link to="/driver/login">
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Truck className="w-4 h-4" /> Driver Portal
            </Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium py-2 ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/cart" onClick={() => setIsOpen(false)} className="text-sm font-medium py-2 text-muted-foreground">
              Cart
            </Link>
            <div className="flex gap-2 pt-2">
              {user ? (
                <Button variant="outline" size="sm" className="flex-1" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <User className="w-4 h-4" /> Login
                  </Button>
                </Link>
              )}
              <Link to="/driver/login" className="flex-1" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="w-full gap-2 bg-primary text-primary-foreground">
                  <Truck className="w-4 h-4" /> Driver
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
