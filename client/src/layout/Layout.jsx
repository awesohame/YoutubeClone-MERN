import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { navHeight } from "../constants";


export default function Layout({
    children,
    className,
    showNavbar = true,
    showSidebar = true,
}) {
    return showNavbar ? (
        <>
            <Navbar showSidebarToggleBtn={!showSidebar} />
            <div
                style={{ height: `calc(100vh - ${navHeight})` }}
                className="w-full bg-white dark:bg-dark_bg relative flex overflow-y-scroll"
                role="region"
                aria-label="Main Content"
                id="main-container"
            >
                <Sidebar isHidden={!showSidebar} />
                <main className="w-full flex-1 flex-grow" role="main">
                    <section className={" w-full min-h-full flex " + className}>
                        {/* <OfflineDetector>{children}</OfflineDetector> */}
                    </section>
                </main>
            </div>
        </>
    ) : (
        // <main role="main" className="w-full bg-white dark:bg-dark_bg" id="main-container">
        //     <section className={twMerge("w-full min-h-screen flex", className)}>
        //         <OfflineDetector>{children}</OfflineDetector>
        //     </section>
        // </main>
        <main>
            no navbar
        </main>
    )
}