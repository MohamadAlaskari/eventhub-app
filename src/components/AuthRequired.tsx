import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface AuthRequiredProps{
    icon: LucideIcon;
    title: string;
    description: string;
}

const AuthRequired = ({icon: Icon, title, description}: AuthRequiredProps) => {
    return(
         <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-muted-foreground mb-6">
              {description}
            </p>
            <Link to="/login">
              <Button variant="hero" size="lg">
                Jetzt anmelden
              </Button>
            </Link>
          </div>
        </div>
    )
}

export default AuthRequired;