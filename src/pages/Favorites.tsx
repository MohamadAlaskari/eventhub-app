import AuthRequired from "@/components/AuthRequired"
import FavoriteEventCard from "@/components/FavoriteEventCard"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/useAuth"
import { useFavorites } from "@/hooks/useFavorites"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"

 const Favorites = () => {
    const {isAuthenticated} = useAuth()
    const { favorites, isloading, removeFavorite} = useFavorites()

    if (!isAuthenticated) {
        return (
            <AuthRequired 
                icon={Heart} 
                title="Your favorites" 
                description="Sign in to view and manage your favorite events.">
            </AuthRequired>
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
                    {isloading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <Card key={i} className="animate-pulse">
                                        <CardHeader>
                                            <Skeleton className="h-4 bg-muted rounded w-3/4"/>
                                            <Skeleton className="h-3 bg-muted rounded w-1/2"/>
                                        </CardHeader>
                                        <CardContent>
                                            <Skeleton className="h-20 bg-muted rounded mb-4"/>
                                            <Skeleton className="h-3 bg-muted rounded w-full mb-2"/>
                                            <Skeleton className="h-3 bg-muted rounded w-2/3"/>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) :

                        /**check if there any Favorites */
                        favorites.length > 0 ? (
            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favorites.map((event) =>(
                                    <FavoriteEventCard
                                        key={event.id}
                                        event={event}
                                        onRemove={removeFavorite}
                                    />
                                ))}
                            </div>

                        ) : 
                        /**if no favrites vorhanden */
                        (
                            <Card className="text-center py-16">
                                <CardContent>
                                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                                    <h3 className="text-2xl font-semibold mb-4">Keine Favoriten gefunden</h3>
                                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                        Sie haben noch keine Events zu Ihren Favoriten hinzugefügt. 
                                        Entdecken Sie spannende Events und markieren Sie Ihre Lieblings-Veranstaltungen.
                                    </p>
                                    <Link to="/events">
                                        <Button variant="hero" size="lg">
                                            Events durchsuchen
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    }

                </div>
            </div>

        </Layout>
    )

}

export default Favorites