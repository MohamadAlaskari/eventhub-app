import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";


interface LayoutProps{
    children: ReactNode,
    className?: string
}

const Layout =({children, className}:LayoutProps)=>{
    return(
        <div className="min-h-screen bg-background relative">
            <Header/>
            <main className={className}>
                {children}
            </main>
            <Footer/>
        </div>
    )
}
export default Layout;           