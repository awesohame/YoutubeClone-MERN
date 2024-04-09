import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

import useActionHandler from "../../hooks/useActionHandler";
import Button from "../Core/Button";
import { toggleSubscription } from "../../store/slices/subscriptionSlice";


export default function SubscribeBtn({
    isSubscribed,
    channelId,
}) {
    const { user } = useSelector((state) => state.auth);
    const [subscribed, setSubscribed] = useState(isSubscribed);

    const { isLoading, handleAction } = useActionHandler({
        action: toggleSubscription,
        isShowToastMessage: false,
    });

    const handleSubscribe = async () => {
        const { success } = await handleAction(channelId);

        if (success) {
            setSubscribed((prev) => !prev);
        }
    };

    return user?._id !== channelId ? (
        <Button
            icon={<FaUserPlus />}
            isLarge={false}
            disabled={isLoading}
            className="text-base text-white bg-[#f10b64] px-4 rounded-full mt-2"
            onClick={handleSubscribe}
        >
            {isLoading ? "Subscribing..." : subscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
    ) : (
        <></>
    );
}
