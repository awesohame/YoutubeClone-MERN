import { useSelector } from "react-redux"

export default function Channel() {
    const { user } = useSelector((state) => state.auth)
    // console.log(user)

    return (
        <div className="dark:text-white">
            Contact me at: {user?.email}
        </div>
    )
}