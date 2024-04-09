import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../../layout/Layout";
import AuthForm, { AuthFormType } from "../../components/AuthForm/AuthForm";
import useActionHandler from "../../hooks/useActionHandler";
import { loginUser } from "../../store/slices/authSlice"

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const redirectPath = location.state?.redirectPath;

    const { isLoading, error, handleAction } = useActionHandler({
        action: loginUser,
        toastMessages: {
            loadingMessage: "Logging in...",
        },
    });

    const handleLogin = async ({
        email,
        password,
    }) => {
        if (!email || !password) {
            return toast.error("All fields are required!");
        }

        const { success } = await handleAction({ email, password });
        if (success) {
            navigate(redirectPath ? redirectPath : "/");
        }
    };

    return (
        <Layout
            showNavbar={false}
            className="bg-slate-50 dark:bg-dark_bg flex justify-center md:pt-24 pt-14 pb-7"
        >
            <AuthForm
                type={AuthFormType.LOGIN}
                title="Login account"
                handleSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
                state={location.state}
            />
        </Layout>
    );
}