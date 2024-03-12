import { useNavigate } from "react-router-dom";
import Button from "../Core/Button";

export default function LogoutBtn({
    className = "",
}) {
    const isLoading = false;
    const navigate = useNavigate();

    const handleLogout = () => {
        // LOGIC TO LOGOUT
        navigate("/")
    }

    return (
        <Button
            className={`bg-red-500 text-sm ` + className}
            onClick={handleLogout}
            disabled={isLoading}
            isLarge={false}
        >
            {isLoading ? "Logout..." : "Logout"}
        </Button>
    );
}