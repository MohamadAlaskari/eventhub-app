import { Link,useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Events', href: '/events' },
    ]

    const isPathActive = (path: string) => {
        if (path==="/" ) return location.pathname === "/";
        return location.pathname.startsWith(path) ;
    }

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 sm:p-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-primary">
                EventsHub
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => (
                    <Link key={item.name} to={item.href} className={cn("text-sm font-medium text-foreground hover:text-primary",
                        isPathActive(item.href) ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                        )}>
                            {item.name}
                    </Link>
                ))}     
            </nav>
            <div className="hidden md:flex gap-2">
                <Link to="/login">
                    <Button variant="ghost" size="sm">
                        Sign In
                    </Button>
                </Link>
                <Link to="/register">
                    <Button variant="default" size="sm">
                        Sign Up
                    </Button>
                </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu" >
                    {isMobileMenuOpen ? ( <X className="h-5 w-5" /> ) : (<Menu className="h-5 w-5" />)}
                </Button>
            </div>
        
        </div>

      </div>
    </header> 
  );
}
export default Header;