import { FaExclamationCircle, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Layout from "../../Layout/Layout";
import Button from "./Core/Button";

export default function DeniedAccess({
    redirectPath,
}) {
    const navigate = useNavigate();
    return (
        <Layout className="min-h-screen flex justify-center items-center">
            <div className="w-[500px] max-w-[92%] flex flex-col gap-8 md:py-14 md:px-8 px-4 py-16 bg-white dark:bg-[#172227] border-[1px] border-slate-300 dark:border-[#272727] shadow-sm rounded-xl">
                <div className="flex items-center justify-center gap-2 text-red-500">
                    <FaExclamationCircle className="text-3xl" />
                    <h1 className="text-2xl font-bold font-hedvig_letters">
                        Access Denied
                    </h1>
                </div>
                <p className="text-gray-700 dark:text-white text-base font-roboto">
                    Oops! It seems like you are not authenticated and don't have the
                    necessary permissions to access this page. Please login or signup to
                    access the page.
                </p>
                <div className="flex items-center justify-center gap-5 font-nunito_sans">
                    <Button
                        onClick={() =>
                            navigate("/auth/login", {
                                state: { redirectPath },
                            })
                        }
                        className="flex items-center gap-3 px-4 py-2 text-white bg-blue-500 rounded-md transition duration-300 hover:bg-blue-600"
                    >
                        <FaSignInAlt />
                        Login
                    </Button>
                    <Button
                        onClick={() =>
                            navigate("/auth/signup", {
                                state: { redirectPath },
                            })
                        }
                        className="flex items-center gap-3 px-4 py-2 text-white bg-green-500 rounded-md transition duration-300 hover:bg-green-600"
                    >
                        <FaSignInAlt />
                        Sign Up
                    </Button>
                </div>
            </div>
        </Layout>
    );
}