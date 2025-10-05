import AuthRequired from "@/components/AuthRequired"
import Layout from "@/components/Layout"
import QuickStatCard from "@/components/QuickStatCard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { useFavorites } from "@/hooks/useFavorites"
import { Heart, Mail, Ticket, User } from "lucide-react"
import { Link } from "react-router-dom"

const Profile = () => {
    const {user, isAuthenticated} = useAuth()
    const {favorites} = useFavorites()

   const getInitials = (name: string) => {
        const names = name.split(" ");
        return names.map((n) => n.charAt(0)).join("");
    }

    if (!isAuthenticated) {
        return (
            <AuthRequired 
                icon={User} 
                title="Profile" 
                description="You need to be logged in to manage your profile.">
            </AuthRequired>
        )
    }
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="space-y-8">
        
                    {/* Profile Header */}
                    <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-strong">
                        <CardContent className="p-8">
                            <div className="flex items-center space-x-6">
                                <Avatar className="h-20 w-20 border-4 border-primary-foreground/20">
                                    <AvatarFallback className="text-2xl font-bold bg-primary-foreground text-primary">
                                        {user?.name ? getInitials(user.name) : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-2">
                                        Wellcome, {user?.name}!
                                    </h1>
                                    <div className="flex items-center space-x-4 text-primary-foreground/80">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4" />
                                        <span>{user?.email}</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <QuickStatCard
                            icon={Heart}
                            count={favorites.length}
                            label="Favoriten"
                            link="/favorites"
                            buttonText="Alle anzeigen"
                            btnVariant="outline"
                            btnDisabled={false}
                            >
                        </QuickStatCard>
                        <QuickStatCard
                            icon={Ticket}
                            count={0}
                            label="Favoriten"
                            buttonText="Available soon"
                            btnVariant="secondary"
                            btnDisabled={true}
                            >
                        </QuickStatCard>
                    
                    </div>
                    
                    {/* Profile Content */}

                </div>
            </div>
        </Layout>
    )
}

export default Profile   