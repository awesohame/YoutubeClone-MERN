import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar";

export default function Layout({
    children,
    showNavbar = true,
    showSidebar = true,
}) {
    return (
        showNavbar ? (
            <div></div>
        ) : (
            <div></div>
        )
    )
}