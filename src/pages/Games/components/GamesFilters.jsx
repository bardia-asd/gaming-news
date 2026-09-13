import { useEffect } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectGamesFilters,
    selectTags,
    selectTagsStatus,
} from "@/features/games/gamesSelector";
import {
    fetchTags,
    setGamesSearch,
    setGamesTag,
} from "@/features/games/gamesSlice";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Render search and tag filters for the games archive.
const GamesFilters = () => {
    // Retrieve the available tags and their loading status from Redux.
    const tags = useSelector(selectTags);
    const status = useSelector(selectTagsStatus);

    // Retrieve the current search and tag filters from Redux.
    const { search, tag } = useSelector(selectGamesFilters);

    const dispatch = useDispatch();

    // Fetch the available tags when they haven't been loaded yet.
    useEffect(() => {
        if (status === "idle") dispatch(fetchTags());
    }, [dispatch, status]);

    return (
        <section>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Arrange the search input and tag filter responsively. */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search input for filtering games by name. */}
                    <div className="relative flex-1">
                        <Input
                            placeholder="Search the games"
                            aria-label="Search games"
                            className="h-11 rounded-full pl-10"
                            value={search}
                            onChange={(e) =>
                                dispatch(setGamesSearch(e.target.value))
                            }
                        />

                        {/* Position the search icon inside the input. */}
                        <span className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground pointer-events-none">
                            <Search size={16} />
                        </span>
                    </div>

                    {/* Dropdown for filtering games by tag. */}
                    <Select
                        value={tag}
                        onValueChange={(value) => dispatch(setGamesTag(value))}>
                        <SelectTrigger className="h-11 rounded-full w-48">
                            <SelectValue placeholder="Filter by tag" />
                        </SelectTrigger>

                        <SelectContent className="rounded-xl">
                            {/* Option for displaying games from every tag. */}
                            <SelectItem value="all" className="rounded-lg">
                                All
                            </SelectItem>

                            {/* Render the available tags as filter options. */}
                            {tags.results?.map((tag) => (
                                <SelectItem
                                    key={tag.id}
                                    value={tag.slug}
                                    className="rounded-lg">
                                    {tag.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
};

export default GamesFilters;
