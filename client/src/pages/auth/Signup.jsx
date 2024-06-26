import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../../layout/Layout";
import AuthForm, { AuthFormType } from "../../components/AuthForm/AuthForm";
import useActionHandler from "../../hooks/useActionHandler";
import { registerUser } from "../../store/slices/authSlice";

export default function Signup() {
    const location = useLocation();
    const navigate = useNavigate();
    const redirectPath = location?.state?.redirectPath;

    const { error, isLoading, handleAction } = useActionHandler({
        action: registerUser,
        toastMessages: {
            loadingMessage: "Creating your account...",
        },
    });

    const handleSignup = async ({
        fullname,
        username,
        email,
        password,
        avatar,
        coverImage,
    }) => {
        if (!fullname || !username || !email || !password) {
            return toast.error("All fields are required!");
        }

        const { success } = await handleAction({
            fullname,
            username,
            email,
            password,
            avatar,
            coverImage,
        });

        if (success) {
            navigate("/auth/login", {
                state: { email, password, redirectPath: redirectPath || "/" },
            });
        }
    };

    return (
        <Layout
            showNavbar={false}
            className="bg-slate-50 dark:bg-dark_bg flex justify-center md:pt-5 pt-3 pb-7"
        >
            <AuthForm
                type={AuthFormType.SIGNUP}
                title="Create an account"
                handleSubmit={handleSignup}
                isLoading={isLoading}
                error={error}
            />
        </Layout>
    );
}