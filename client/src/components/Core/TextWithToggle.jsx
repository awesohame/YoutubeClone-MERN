import { useState, useEffect, useRef } from 'react';

export default function TextWithToggle({
    children,
    initialShowLine,
    className,
}) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [showAll, setShowAll] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    function isTextOverflowing() {
        if (containerRef.current && contentRef.current) {
            const containerHeight = containerRef.current.clientHeight;
            const contentHeight = contentRef.current.clientHeight;
            return contentHeight > containerHeight;
        }
        return false;
    }

    useEffect(() => {
        setIsOverflowing(isTextOverflowing());
    }, [children, initialShowLine, contentRef])

    const toggleShow = () => {
        setShowAll(!showAll);
    }

    return (
        <div ref={containerRef}>
            <p
                ref={contentRef}
                className={className}
                style={
                    showAll
                        ? { overflow: "unset", display: "block" }
                        : {
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: initialShowLine,
                            WebkitBoxOrient: "vertical",
                        }
                }
            >
                {children}
            </p>
            {isOverflowing && !showAll && (
                <button
                    onClick={toggleShow}
                    className="text-zinc-600 dark:text-slate-400"
                >
                    View more
                </button>
            )}
            {showAll && (
                <button
                    onClick={toggleShow}
                    className="text-zinc-600 dark:text-slate-400"
                >
                    View less
                </button>
            )}
        </div>
    )
}