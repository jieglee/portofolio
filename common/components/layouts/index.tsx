"use client";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLayout } from "@/common/stores/layout";
import { useMenu } from "@/common/stores/menu";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import MobileMenu from "./sidebar/MobileMenu";

const Notif = dynamic(() => import("../elements/Notif"), { ssr: false });

interface LayoutsProps {
    children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
    const { mode } = useLayout();
    const { isOpen } = useMenu();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 769);
        const handleResize = () => setIsMobile(window.innerWidth < 769);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        AOS.init({ duration: 800, delay: 50 });
    }, []);

    if (mode === "topbar") {
        return (
            <div className="min-h-screen">
                <Topbar />
                <main className="mx-auto max-w-[90rem] px-6 py-6">
                    {children}
                </main>
                <Notif />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-[90rem] lg:px-12">
            <div className="mx-auto flex flex-col lg:flex-row lg:gap-5 lg:py-4">
                <Sidebar />
                <main className="max-w-[80rem] pt-16 transition-all duration-300 lg:w-4/5 lg:pt-0">
                    {children}
                </main>
            </div>
            <Notif />
            {isMobile && (
                <AnimatePresence>{isOpen && <MobileMenu />}</AnimatePresence>
            )}
        </div>
    );
};

export default Layouts;