import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../../Layout/Layout";
import TweetCreateForm from "../../components/createForms/TweetCreateForm";
import useActionHandler from "../../hooks/useActionHandler";
import { getTweetById } from "../../store/slices/tweetSlice";
import ErrorDialog from "../../components/Error/ErrorDialog";
import Loader from "../../components/Loader";

export default function TweetEdit() {
    const { tweetId } = useParams();
    const { tweet } = useSelector((state) => state?.tweet);
    const { user: appLoading } = useSelector(
        (state) => state?.appLoading
    );

    const {
        error: tweetFetchError,
        isLoading: isTweetFetching,
        handleAction: fetchTweet,
    } = useActionHandler({
        action: getTweetById,
        isShowToastMessage: false,
    });

    useEffect(() => {
        if (tweetId) {
            fetchTweet(tweetId);
        }
    }, [tweetId]);

    return tweetFetchError ? (
        <Layout>
            <ErrorDialog
                errorMessage={tweetFetchError}
                buttonLabel="Try again"
                buttonOnClick={() => fetchTweet(tweetId)}
            />
        </Layout>
    ) : isTweetFetching || appLoading ? (
        <Loader />
    ) : (
        <Layout>
            <div className="w-full px-3 md:pr-7 md:pt-4 pt-14">
                <TweetCreateForm tweet={tweet} />
            </div>
        </Layout>
    );
}