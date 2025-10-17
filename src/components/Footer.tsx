import { Link } from "react-router-dom"

const Footer = () => {
  return    (
    <footer className="absolute bottom-0 w-full bg-gradient-hero text-white p-6">
        <div className=" flex justify-center ">
            <p className="">© 2025             
                <Link to={"/"} className="text-1xl font-bold px-1">EventHub.</Link>
            All rights reserved by
            <Link to={"https://www.alaskaritech.com"} className="text-1xl font-bold px-1">ALaskari Tech.</Link>
            </p>
        </div>

    
    </footer>
  )

}
export default Footer