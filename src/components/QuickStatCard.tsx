import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface QuickStatCardProps{
  icon: LucideIcon;
  count: number | string;
  label: string;
  link?: string;
  buttonText: string;
  btnVariant?: "default" | "outline" | "secondary" | "hero" ;
  btnDisabled?: boolean;
}

const QuickStatCard = ({icon: Icon, count, label, link, buttonText, btnVariant="outline", btnDisabled = false }: QuickStatCardProps)=>{

    return (
        <Card className="text-center hover:shadow-strong transition-all duration-300">
            <CardContent className="p-6">
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-1">{count}</h3>
                <p className="text-muted-foreground">{label}</p>
                <Link to={link ?? '#'} className="block mt-3">
                    <Button variant={btnVariant} size="sm" className="w-full" disabled={btnDisabled}>
                        {buttonText}
                    </Button>
                </Link>               
            </CardContent>                
        </Card>

    )
}

export default QuickStatCard