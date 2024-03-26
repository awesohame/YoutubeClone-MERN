export default function Skeleton({
    className = "",
}) {
    return (
        <div
            className={
                " animate-pulse bg-gray-300 dark:bg-[#303030] " +
                className
            }
        ></div>
    )
}