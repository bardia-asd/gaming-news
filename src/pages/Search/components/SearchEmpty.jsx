import { SearchX } from "lucide-react";

const SearchEmpty = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20">
            <SearchX className="size-10 text-muted-foreground mb-4" />

            <h2 className="text-xl font-semibold">No stories found</h2>

            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Try searching with a different keyword or phrase.
            </p>
        </div>
    );
};

export default SearchEmpty;
