import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import Button from "./Core/Button";
import ErrorDialog from "./Error/ErrorDialog";

export default function ScrollPagination({
    paginationType = "infinite-scroll",
    loadNextPage = () => { },
    refreshHandler = () => { },
    dataLength,
    loading,
    error,
    currentPage,
    totalItems,
    totalPages,
    hasNextPage,
    endMessage,
    children,
    className = "",
}) {
    const handleScroll = () => {
        const container = document.getElementById("main-container");

        if (!container || loading || currentPage >= totalPages || !hasNextPage) {
            return;
        }

        if (
            container.scrollTop + container.clientHeight >=
            container.scrollHeight - container.clientHeight
        ) {
            loadNextPage();
        }
    }

    useEffect(() => {
        const container = document.getElementById("main-container");

        if (container && paginationType === "infinite-scroll") {
            container.addEventListener("scroll", handleScroll);

            return () => {
                container.removeEventListener("scroll", handleScroll);
            };
        }
    }, [currentPage, loading, hasNextPage, totalPages]);

    return (
        <div
            className={
                " w-full flex flex-col " +
                paginationType === "infinite-scroll" &&
                " min-h-screen pb-5 max-md:pb-24 "
                +
                className
            }
        >
            {error ? (
                <ErrorDialog
                    errorMessage={error}
                    buttonLabel="Try again"
                    buttonOnClick={refreshHandler}
                />
            ) : (
                <>
                    {children}
                    {dataLength >= totalItems &&
                        totalItems > 0 &&
                        endMessage &&
                        endMessage}
                    {paginationType === "view-more" &&
                        dataLength !== totalItems &&
                        hasNextPage &&
                        !loading && (
                            <Button
                                onClick={loadNextPage}
                                className="mt-2 bg-slate-200 dark:bg-[#171717] rounded-full text-sm font-hedvig_letters border-slate-300 dark:border-[#202020] text-black dark:text-white"
                            >
                                "Load More"
                            </Button>
                        )}
                    {loading && (
                        <div className="w-full flex justify-center mb-5 max-md:mt-3">
                            <RotatingLines
                                visible={true}
                                width="75"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}