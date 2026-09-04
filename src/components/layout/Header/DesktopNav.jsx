import { NavLink } from "react-router";
import { navItems } from "@/data/navData";
import { cn } from "@/utils/utils";

const DesktopNav = () => {
    return (
        <nav className="hidden lg:block">
            <ul className="flex items-center gap-6">
                {navItems.map((i) => (
                    <li key={i.label}>
                        <NavLink
                            to={i.href}
                            className={({ isActive }) =>
                                cn(
                                    "text-sm font-medium transition-colors",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground",
                                )
                            }>
                            {i.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DesktopNav;
