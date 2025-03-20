import { useState } from "react";
import { Button } from "./ui/Button";
import { Brain, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Quizzy", href: "#about-quizzy" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 ">
          <div className="flex justify-between w-full ">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                Quizzy
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="inline-flex  items-center px-1 pt-1 text-md font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
