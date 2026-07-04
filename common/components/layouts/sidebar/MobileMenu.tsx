import { motion } from "framer-motion";

import { MENU_ITEMS } from "@/common/constants/menu";

import Breakline from "../../elements/Breakline";
import SettingsDropdown from "../../elements/SettingsDropdown";

import Menu from "./Menu";
import LayoutToggleButton from "../LayoutToogleButton";

const MobileMenu = () => {
    const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
    return (
        <motion.div
            className="fixed inset-x-0 top-[4.5rem] z-30 flex h-[calc(100vh-4.5rem)] flex-col bg-background"
            initial={{ y: -20, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
        >
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <Breakline />
                <Menu list={filteredMenu} />
            </div>
            <div className="shrink-0 border-t border-border px-4 py-3">
                <div className="flex items-center justify-between">
                    <SettingsDropdown />
                    <LayoutToggleButton />
                </div>
            </div>
        </motion.div>
    );
};

export default MobileMenu;