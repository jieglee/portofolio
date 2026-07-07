import React from "react";

import { MENU_ITEMS } from "@/common/constants/menu";

import SettingsDropdown from "../../elements/SettingsDropdown";
import Breakline from "../../elements/Breakline";
import Profile from "./Profile";
import Menu from "./Menu";
import LayoutToggleButton from "../LayoutToogleButton";

export default function Sidebar() {
    const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
    return (
        <header className="lg:w-40 xl:w-44">
            <div className="sticky top-0 z-10 flex flex-col transition-all duration-300 lg:py-3">
                <LayoutToggleButton />
                <Profile />
                <div className="hidden md:block">
                    <Breakline />
                    <div className="hidden lg:block">
                        <Menu list={filteredMenu} />
                    </div>
                    <Breakline />
                    <div className="flex items-center justify-between">
                        <SettingsDropdown />
                    </div>
                </div>
            </div>
        </header>
    );
}