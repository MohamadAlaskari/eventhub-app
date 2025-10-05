import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"

 const Favorites = () => {
    const {user, isAuthenticated} = useAuth()

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                    <h1 className="text-3xl font-bold mb-4">Ihre Favoriten</h1>
                    <p className="text-muted-foreground mb-6">
                        Melden Sie sich an, um Ihre Lieblings-Events zu sehen und zu verwalten.
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

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <Heart className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">My Favorites</h1>
                        </div>
                        <p className="text-muted-foreground text-lg">
                            All events you have added to your favorites
                        </p>
                    </div>

                    {/* Favorites Content */}

                </div>
            </div>

        </Layout>
    )

}

export default Favorites