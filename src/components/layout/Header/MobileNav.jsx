import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowUpRight, TextAlignJustify, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { navItems } from "@/data/navData";

// Mobile navigation drawer
// Opens from the top and automatically closes when the route changes.
const MobileNav = () => {
    // Controls whether the mobile navigation drawer is open.
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const location = useLocation();

    // Close the mobile menu whenever the current route changes.
    // This prevents the drawer from remaining open after navigation.
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <Drawer
            open={isMobileMenuOpen}
            handleOnly
            onOpenChange={setIsMobileMenuOpen}
            direction="top">
            {/* Button used to open the mobile navigation drawer. */}
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                    <TextAlignJustify size={20} />
                </Button>
            </DrawerTrigger>

            {/* Full-screen mobile navigation menu. */}
            <DrawerContent className="inset-0 gap-4 px-6 py-8 lg:hidden">
                {/* Button used to close the navigation drawer. */}
                <DrawerClose asChild>
                    <Button variant="outline" size="icon" className="ml-auto">
                        <X size={20} />
                    </Button>
                </DrawerClose>

                {/* Navigation section label. */}
                <span className="text-primary text-xs tracking-widest uppercase">
                    navigation
                </span>

                {/* Mobile navigation links. */}
                <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className="flex items-center justify-between py-3 text-2xl font-bold border-b border-border">
                            {item.label}
                            <ArrowUpRight className="text-primary" />
                        </Link>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default MobileNav;
