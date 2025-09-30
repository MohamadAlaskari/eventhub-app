import Layout from "@/components/Layout"

const Events = () => {
    return (
        <Layout>
            {/* Header Section */}
            <section className="bg-gradient-hero py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Discover Events
                        </h1>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto"> 
                            Find amazing events happening around you. From concerts to conferences, 
                            there's something for everyone.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
    
}

export default Events