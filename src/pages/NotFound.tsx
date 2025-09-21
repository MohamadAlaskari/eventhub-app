import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-primary p-4 rounded-full w-24 h-24 mx-auto mb-8 shadow-strong">
              <Search className="h-16 w-16 text-primary-foreground" />
            </div>
            
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Oops! Page not found
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back to discovering amazing events!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              
              <Link to="/events">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
