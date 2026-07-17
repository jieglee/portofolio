import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { useMenu } from "@/common/stores/menu";

import MobileMenuButton from "./MobileMenuButton";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const { isOpen, toggleMenu, setProfileHeight } = useMenu();

    const imageSize = isMobile ? 40 : 100;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobile(window.innerWidth < 769);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 769);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        if (profileRef.current) {
            setProfileHeight(profileRef.current.offsetHeight);
        }
    }, [isOpen, setProfileHeight]);

    return (
        <div
            ref={profileRef}
            className={clsx(
                "fixed w-full bg-background px-4 py-3 border-b border-border lg:relative lg:border-none lg:bg-transparent! lg:p-0 xl:shadow-none",
                isOpen ? "z-[60]" : "z-20",
                isOpen && "pb-0",
            )}
        >
            <div className="flex items-center justify-between md:px-2 lg:flex-col lg:space-y-4">
                <ProfileHeader expandMenu={isOpen} imageSize={imageSize} />
                {isMobile && (
                    <div className="mt-1 flex items-center gap-2 lg:hidden">
                        <MobileMenuButton expandMenu={isOpen} setExpandMenu={toggleMenu} />
                    </div>
                )}
            </div>

        </div>
    );
};

export default Profile;