import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import heroImage from '@/assets/hero-events.jpg';

const Index = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary min-h-[80vh] flex items-center">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: `url(${heroImage})` }} />
                <div className="absolute inset-0 bg-primary opacity-90" />
                <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-float">
                            Discover Amazing                                
                            <span className="bg-gradient-accent bg-clip-text text-transparent block mt-2">
                                Events Near You
                            </span>
                        </h1>    
                        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of people discovering and attending incredible events. 
                            From music festivals to tech conferences, find your next adventure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/events">
                                <Button variant="default" size="xl" className="w-full sm:w-auto animate-pulse-glow">
                                    <Calendar className="mr-2 h-5 w-5" /> Explore Events 
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20">
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Index