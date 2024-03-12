import { Link } from 'react-router-dom';

export default function Logo({
    className = "",
}) {
    return (
        <Link to="/" className={"block md:w-[140px] w-[130px] dark:invert" + className}>
            <img src="/logo.png" alt="Logo" />
        </Link>
    )
}