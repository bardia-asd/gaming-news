import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark, Search, X } from "lucide-react";

import { setSearchQuery } from "@/features/search/searchSlice";

import DesktopNav from "./DesktopNav";
import ThemeSwitch from "./ThemeSwitch";
import HeaderSearch from "./HeaderSearch";
import MobileNav from "./MobileNav";

import { Button } from "@/components/ui/button";

const Header = () => {
    // Controls the visibility of the search panel.
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // References the search area for outside-click detection.
    const searchRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Search query now lives in Redux, not local state.
    const searchQuery = useSelector((state) => state.search.query);

    // Closes the search panel and clears the current search query.
    const closeSearch = () => {
        setIsSearchOpen(false);
        dispatch(setSearchQuery(""));
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

    // Navigate to the search page with the query in the URL.
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = searchQuery.trim();
        if (!trimmed) return;

        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        closeSearch();
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
                                    setSearchQuery={(value) =>
                                        dispatch(setSearchQuery(value))
                                    }
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
