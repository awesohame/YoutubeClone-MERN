import { useEffect, useRef } from "react";

export default function EditableTextArea({
    value,
    onChange = () => { },
    className = "",
    ...props
}) {
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            const textarea = textAreaRef.current;
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }, [value]);

    const handleInputChange = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    return (
        <textarea
            ref={textAreaRef}
            className={
                " text-sm text-gray-800 bg-transparent dark:text-slate-200 font-roboto font-normal outline outline-0 focus:outline-0 disabled:opacity-60 border-2 border-gray-200 dark:border-gray-600  p-2 overflow-hidden resize-none rounded-sm focus:border-gray-900 dark:focus:border-white whitespace-break-spaces "
                + className
            }
            value={value}
            onChange={handleInputChange}
            {...props}
        >

        </textarea>
    )
}