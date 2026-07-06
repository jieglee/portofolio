import { motion } from "framer-motion";

import { MENU_ITEMS } from "@/common/constants/menu";
import { useMenu } from "@/common/stores/menu";

import Breakline from "../../elements/Breakline";

import Menu from "./Menu";

const MobileMenu = () => {
    const { profileHeight } = useMenu();
    const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
    return (
        <motion.div
            className="fixed inset-x-0 z-50 flex flex-col bg-background lg:hidden"
            style={{ top: profileHeight, height: `calc(100dvh - ${profileHeight}px)` }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
        >
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <Breakline />
                <Menu list={filteredMenu} />
            </div>

        </motion.div>
    );
};

export default MobileMenu;