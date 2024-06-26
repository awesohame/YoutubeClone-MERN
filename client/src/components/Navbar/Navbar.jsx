import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { navHeight } from "../../constants";

import Logo from "../Core/Logo";
import Avatar from "../Core/Avatar";
import Button from "../Core/Button";
import DropdownMenu from "../Core/DropdownMenu";

import SearchBar from "./SearchBar"
import LogoutBtn from "./LogoutBtn";
import SidebarToggleBtn from "./SidebarToggleBtn";

import Skeleton from "../Skeleton";

export default function Navbar({
    showSidebarToggleBtn,
}) {
    const navigate = useNavigate();
    const { user: appLoading } = useSelector(
        (state) => state.appLoading
    );
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    // let isLoggedIn = true;

    return (
        <nav
            className={`w-full bg-white dark:bg-dark_bg flex justify-between items-center md:px-7 px-3`}
            style={{ height: navHeight }}
            role="navigation"
            aria-label="Primary Navigation"
        >
            {/* Left Section */}
            <div className="flex items-center">
                <SidebarToggleBtn
                    className={showSidebarToggleBtn ? "md:block" : "md:hidden"}
                />
                <Logo />
            </div>

            {/* Center Section */}
            <div className="max-sm:hidden">
                <SearchBar />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1">
                {/* Display user information or login/signup buttons */}
                {isLoggedIn ? (
                    // If user is logged in, show user Dropdown menu
                    appLoading ? (
                        <Skeleton className="w-10 h-10 rounded-full" />
                    ) : (
                        <DropdownMenu
                            triggerButton={
                                <Avatar
                                    url={user?.avatar || ""}
                                    fullName={user?.fullName || ""}
                                />
                            }
                        >
                            {/* User Information */}
                            <div className="flex gap-3">
                                <Avatar
                                    url={user?.avatar || ""}
                                    fullName={user?.fullName || ""}
                                />
                                <div className="flex flex-col min-w-[120px] max-w-[165px]">
                                    <h1 className="text-base text-gray-900 dark:text-white font-roboto truncate">
                                        {user?.fullName}
                                    </h1>
                                    <p className="text-sm text-gray-700 dark:text-[#AAAAAA] font-nunito leading-none truncate">
                                        {user?.username}
                                    </p>
                                    {/* Link to user's channel */}
                                    <Link
                                        to={`/channel/${user?.username}`}
                                        className="text-[12px] text-blue-600 dark:text-blue-500 font-[600] font-nunito_sans leading-5"
                                    >
                                        View your channel
                                    </Link>
                                </div>
                            </div>
                            {/* Dropdown Menu Options */}
                            <Link to="/account" className="text-gray-700 dark:text-slate-300">
                                Account & Password
                            </Link>
                            <Link
                                to="/dashboard"
                                className="text-gray-700 dark:text-slate-300"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/settings"
                                className="text-gray-700 dark:text-slate-300"
                            >
                                Setting
                            </Link>
                            <hr />
                            {/* logout */}
                            <LogoutBtn className="w-full" />
                        </DropdownMenu>
                    )
                ) : // If user is not logged in, show login/signup buttons
                    appLoading ? (
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-16 rounded-md" />
                            <Skeleton className="h-8 w-16 rounded-md" />
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Button
                                type="button"
                                isLarge={false}
                                isGradientBg={true}
                                className=" h-8 w-16 rounded-md "
                                onClick={() => navigate("/auth/login")}
                            >Login</Button>
                            <Button
                                type="button"
                                isLarge={false}
                                className="h-10 w-16 rounded-md bg-slate-50 dark:bg-[#202020] text-violet-600 dark:text-white border-slate-300  dark:border-gray-600"
                                onClick={() => navigate("/auth/signup")}
                            >Signup</Button>
                        </div>
                    )}
            </div>
        </nav>
    );
}