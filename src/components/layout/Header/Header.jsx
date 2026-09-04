import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { Bookmark, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
    // Controls the visibility of the search panel.
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Stores the current search input value.
    const [searchQuery, setSearchQuery] = useState("");

    // References the search area for outside-click detection.
    const searchRef = useRef(null);

    const location = useLocation();

    // Closes the search panel and clears the current search query.
    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery("");
    };

    // Close and reset the search when navigating to a different page.
    useEffect(() => {
        closeSearch();
    }, [location.pathname]);

    // Close the search panel when clicking anywhere outside of it.
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                closeSearch();
            }
        };

        // Only listen for outside clicks while the search is open.
        if (isSearchOpen) {
            document.addEventListener("pointerdown", handleClickOutside);
        }

        // Remove the event listener when the search closes or the component unmounts.
        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [isSearchOpen]);

    // Prevent the default form submission until search functionality is implemented.
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="uppercase font-black">
                        <span className="text-primary">px</span> / playback
                    </Link>

                    <DesktopNav />

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link to="/saved">
                                <Bookmark size={20} />
                            </Link>
                        </Button>

                        <ThemeSwitch />

                        <div ref={searchRef}>
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label={
                                    isSearchOpen
                                        ? "Close search"
                                        : "Open search"
                                }
                                aria-expanded={isSearchOpen}
                                onClick={() => {
                                    if (isSearchOpen) {
                                        closeSearch();
                                    } else {
                                        setIsSearchOpen(true);
                                    }
                                }}>
                                {isSearchOpen ? (
                                    <X size={20} />
                                ) : (
                                    <Search size={20} />
                                )}
                            </Button>

                            {isSearchOpen && (
                                <HeaderSearch
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    onSubmit={handleSubmit}
                                />
                            )}
                        </div>

                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
