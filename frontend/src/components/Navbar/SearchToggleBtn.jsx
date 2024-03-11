import { useDispatch } from "react-redux";
import { Menu } from "@mui/icons-material";
import { onToggle } from "../../store/slices/sidebarSlice";

export default function SidebarToggleBtn(
    className = ""
) {
    const dispatch = useDispatch();

    return (
        <button
            className={" text-2xl text-gray-500 dark:text-white font-[100] w-10 h-10 grid place-items-center rounded-full bg-slate-100 dark:bg-[#121212] hover:bg-[#f8f8f8] dark:hover:bg-[#131313] " + className}
            onClick={() => dispatch(onToggle())}
        >
            <Menu />
        </button>
    )
}