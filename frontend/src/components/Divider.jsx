export default function Devider({
    type = "horizontal",
    className = "",
}) {
    return (
        <div
            className={
                "bg-[#00000015] dark:bg-gray-800 m-1 " +
                    type === " horizontal " ? " w-full h-[1.5px]" : " w-[1.5px] h-full " +
                className
            }
        ></div>
    );
}