import { useEffect } from 'react';

export default function useClickOutside(
    ref,
    callback
) {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e && ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        }

        const handleEscapeKey = (e) => {
            if (e.key === "Escape") {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        }
    }, [ref, callback]);
}