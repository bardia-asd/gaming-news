import PropTypes from "prop-types";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeaderSearch = ({ searchQuery, setSearchQuery, onSubmit }) => {
    // Renders the search form displayed in the header search panel.
    return (
        <div className="absolute top-full left-0 w-full bg-muted border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 py-4">
                <form
                    onSubmit={onSubmit}
                    className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex-1 min-w-0 flex items-center">
                        <Search size={20} />

                        {/* Controlled input that keeps the search query in sync with the parent component. */}
                        <Input
                            id="search"
                            autoFocus
                            placeholder="Search stories and games eg. Xbox"
                            className="bg-transparent border-none shadow-none focus-visible:ring-0 md:text-base"
                            aria-label="Search stories and games"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Disable submission when the search query is empty or contains only whitespace. */}
                    <Button
                        type="submit"
                        size="lg"
                        className="rounded-full px-6"
                        disabled={!searchQuery.trim()}>
                        Search
                    </Button>
                </form>
            </div>
        </div>
    );
};

HeaderSearch.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default HeaderSearch;
