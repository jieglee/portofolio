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
            className="my-3 flex h-[calc(100vh-4rem)] flex-col"
            initial={{ y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex-1 overflow-y-auto">
                <Breakline />
                <Menu list={filteredMenu} />
            </div>
            <div className="shrink-0">
                <Breakline />
                <div className="flex items-center justify-between px-1">
                    <SettingsDropdown />
                    <LayoutToggleButton />
                </div>
            </div>
        </motion.div>
    );
};

export default MobileMenu;