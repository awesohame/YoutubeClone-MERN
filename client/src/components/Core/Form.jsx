import Button from "./Button";
import ErrorMessage from "../Error/ErrorMessage";

export default function Form({
    title,
    description,
    inputs,
    submitButtonLabel,
    submitButtonIcon,
    isSubmitButtonPositionLeft = true,
    isButtonDisabled = false,
    onSubmit,
    isLoading,
    error
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="py-7 md:px-9 px-4 border border-zinc-300 dark:border-[#c5c5c547] bg-slate-50 dark:bg-[#222222] flex flex-col gap-7"
        >
            <div className="flex flex-col gap-[2px]">
                <h1 className="text-zinc-950 dark:text-white text-2xl font-roboto font-[600]">
                    {title}
                </h1>
                <p className="text-zinc-700 dark:text-slate-400 text-lg font-poppins leading-5">
                    {description}
                </p>
            </div>
            {error && <ErrorMessage errorMessage={error} />}
            {inputs}
            <Button
                type="submit"
                icon={submitButtonIcon}
                disabled={isButtonDisabled}
                isGradientBg={true}
                className={`w-fit px-8 text-base ${isSubmitButtonPositionLeft ? "self-start" : "self-end"
                    }`}
            >
                {isLoading ? "Loading..." : submitButtonLabel}
            </Button>
        </form>
    )

}