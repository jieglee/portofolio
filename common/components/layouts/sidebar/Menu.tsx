import { MenuItemProps } from "@/common/types/menu";
import MenuItem from "./MenuItem";

interface MenuProps {
    title?: string;
    list: MenuItemProps[];
}

const Menu = ({ title, list }: MenuProps) => {
    return (
        <nav className="flex flex-col gap-y-0.5">
            {title && (
                <div className="mb-1 ml-2 mt-1 hidden text-xs text-foreground/60 lg:block">
                    {title}
                </div>
            )}
            {list?.map((item: MenuItemProps, index: number) => (
                <MenuItem key={index} {...item} />
            ))}
        </nav>
    );
};

export default Menu;