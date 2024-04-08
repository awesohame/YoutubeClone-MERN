import { useNavigate } from "react-router-dom";
import Button from "../Core/Button";
import axios from "axios";

import { useDispatch } from "react-redux";
import { sohamRemoveUser } from "../../store/slices/authSlice";

export default function LogoutBtn({
    className = "",
}) {
    const isLoading = false;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        // LOGIC TO LOGOUT
        const response = await axios.post("/api/v1/users/logout");
        // console.log(response.data);
        if (response.data.statusCode === 200) {
            localStorage.removeItem("authToken");
            dispatch(sohamRemoveUser());
        }

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