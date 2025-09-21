import { Routes, Route } from "react-router-dom";
import EventDetail from "./pages/EventDetail";
import Events from "./pages/Events";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="*" element={<NotFound/>} />
        
    </Routes>
  );
}
export default AppRoutes;