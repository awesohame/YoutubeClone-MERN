import { useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { FaUserPlus } from "react-icons/fa";

import Button from "../Core/Button";
import useActionHandler from "../../hooks/useActionHandler";
import { toggleSubscription } from "../../store/slices/subscriptionSlice";


export default function SubscribeBtn({
    isSubscribed,
    channelId,
    className = "",
}) {
    const { user } = useSelector((state) => state.auth);
    const [subscribed, setSubscribed] = useState(isSubscribed);

    const { isLoading, handleAction } = useActionHandler({
        action: toggleSubscription,
        isShowToastMessage: false,
    });

    const handleSubscribe = async () => {
        const { isSuccess } = await handleAction(channelId);

        if (isSuccess) {
            setSubscribed((prev) => !prev);
        }
    };

    return user?._id !== channelId ? (
        <Button
            icon={<FaUserPlus />}
            isLarge={false}
            disabled={isLoading}
            className={twMerge(
                "text-base text-white bg-[#f10b64] px-4 rounded-full mt-2",
                className
            )}
            onClick={handleSubscribe}
        >
            {isLoading ? "Subscribing..." : subscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
    ) : (
        <></>
    );
}