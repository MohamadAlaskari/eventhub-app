import Layout from "@/components/Layout"
import { Heart } from "lucide-react"

 const Favorites = () => {

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