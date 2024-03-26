import toast from "react-hot-toast"
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function useActionHandler({
    action,
    isShowToastMessage = true,
    toastMessages
}) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSuccessToast = (
        isShowToastMessage,
        successMessage,
        defaultMessage,
        loadingToast
    ) => {
        if (isShowToastMessage && (successMessage || defaultMessage)) {
            toast.success(successMessage || defaultMessage || "Success!", {
                id: loadingToast ? loadingToast : undefined,
            });
        }
    }

    const getErrorMessage = (
        errors,
        defaultMessage
    ) => {
        if (errors && Object.values(errors).length) {
            return Object.values(errors)[0].message;
        }
        return defaultMessage || "Something went wrong!";
    }

    const handleErrorToast = (
        isShowToastMessage,
        errorMessage,
        defaultMessage,
        loadingToast
    ) => {
        const error = errorMessage || defaultMessage || "Something went wrong!";
        if (isShowToastMessage && error) {
            toast.error(error, {
                id: loadingToast ? loadingToast : undefined,
            });
        }
    }


    const handleAction = async (payload) => {
        setIsLoading(true);
        setError(null);

        const { loadingMessage, successMessage, errorMessage } = toastMessages || {};

        const loadingToast = isShowToastMessage && loadingMessage ? toast.loading(loadingMessage) : null;

        try {
            let res;
            if ("payload" in action) {
                res = { payload: payload || null }
            }
            else {
                res = await dispatch(action(payload));
            }

            if (res?.payload?.success) {
                const resData = res.payload.data;
                handleSuccessToast(isShowToastMessage, successMessage, res.payload.message, loadingToast);
                return { success: true, error: null, resData };
            }
            else {
                const error = getErrorMessage(res?.payload?.errors, res?.payload?.message);
                handleErrorToast(isShowToastMessage, errorMessage, error, loadingToast);
                setError(error || null);
                return { success: false, error: error || null, resData: {} };
            }
        }
        catch (e) {
            const error = getErrorMessage(null, e?.message);
            handleErrorToast(isShowToastMessage, errorMessage, error, loadingToast);
            setError(error);
            return { success: false, error: error, resData: {} };
        }
        finally {
            setIsLoading(false);
        }
    }
    return { handleAction, isLoading, error };
}