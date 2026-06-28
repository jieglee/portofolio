"use client";
import { useTranslations } from "next-intl";
import { useLayout } from "@/common/stores/layout";
import { TbLayoutNavbar as TopbarIcon } from "react-icons/tb";
import Tooltip from "../elements/Tooltip";

const LayoutToggleButton = () => {
    const t = useTranslations("Common");
    const { toggleMode } = useLayout();

    return (
        <Tooltip title={t("switchTopbar")}>
            <button
                onClick={toggleMode}
                className="flex items-center justify-center rounded-lg p-2 text-neutral-500 transition-all hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                aria-label={t("switchTopbarLabel")}
            >
                <TopbarIcon size={18} />
            </button>
        </Tooltip>
    );
};

export default LayoutToggleButton;