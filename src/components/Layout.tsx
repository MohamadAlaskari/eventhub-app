import type { ReactNode } from "react";
import Header from "./Header";


interface LayoutProps{
    children: ReactNode,
    className?: string
}

const Layout =({children, className}:LayoutProps)=>{
    return(
        <div>
            <Header/>
            <main className={className}>
                {children}
            </main>
        </div>
    )
}
export default Layout;           