import { Link,useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Calendar, ChevronDown, Heart, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const user = { name: "John Doe" };


    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Events', href: '/events' },
    ]

    const isActivePath = (path: string) => {
        if (path==="/" ) return location.pathname === "/";
        return location.pathname.startsWith(path) ;
    }

      const handleLogout = () => {
        navigate('/');
    };



  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 sm:px  -6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
                <div className="bg-gradient-primary p-2 rounded-lg shadow-medium group-hover:shadow-glow transition-all duration-300 ">
                    <Calendar className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="bg-gradient-primary bg-clip-text text-transparent text-xl font-bold text-primary">
                    EventHub
                </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => (
                    <Link key={item.name} to={item.href} className={cn("text-sm font-medium text-foreground hover:text-primary",
                        isActivePath(item.href) ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                        )}>
                            {item.name}
                    </Link>
                ))}     
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex gap-2">
            { isAuthenticated ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-foreground">
                                Hallo, {user.name}
                            </span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link to="/profile" className="w-full">
                                <User className="mr-2 h-4 w-4" />
                                    Profil
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/favorites" className="w-full">
                                <Heart className="mr-2 h-4 w-4" />
                                    Favoriten
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {setIsAuthenticated(false);  }}>
                        <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            ): (  
                <>
                <Link to="/login">
                    <Button variant="ghost" size="sm" onClick={() => {setIsAuthenticated(true);  }} >
                        Sign In
                    </Button>
                    </Link>
                <Link to="/register">
                    <Button variant="hero" size="sm">
                        Sign Up
                    </Button>
                </Link>
                </>
            )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu" >
                    {isMobileMenuOpen ? ( <X className="h-5 w-5" /> ) : (<Menu className="h-5 w-5" />)}
                </Button>
            </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    isActivePath(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-accent"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-4 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-foreground">
                      Hallo, {user.name}
                    </div>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        Profil
                      </Button>
                    </Link>
                    <Link to="/favorites" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start" size="sm">
                        <Heart className="mr-2 h-4 w-4" />
                        Favoriten
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsAuthenticated(true)}>
                      <Button variant="ghost" className="w-full justify-start mb-2" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsAuthenticated(false)}>
                      <Button variant="hero" className="w-full" size="sm">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header> 
  );
}
export default Header;