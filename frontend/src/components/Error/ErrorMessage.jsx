import { FiAlertTriangle } from "react-icons/fi";

export default function ErrorMessage({
    errorMessage,
    className = "",
}) {
    return (
        <div
            className={" w-full flex gap-2 items-center border border-red-600 bg-red-50 dark:bg-red-500 shadow-sm rounded-sm p-2 " + className}
        >
            <p className="text-red-600 dark:text-white text-base font-nunito w-full">
                {errorMessage}
            </p>
            <FiAlertTriangle className="text-xl text-red-600 dark:text-white" />
        </div>
    )
}