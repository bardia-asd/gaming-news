import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { selectReviewsFilter } from "@/features/reviews/reviewsSelectors";
import {
    setReviewsScoreBucket,
    setReviewsSearch,
} from "@/features/reviews/reviewsSlice";

// Render search and score filters for the reviews archive.
const ReviewsFilters = () => {
    // Retrieve the current review filters from Redux.
    const { search, scoreBucket } = useSelector(selectReviewsFilter);

    const dispatch = useDispatch();

    return (
        <section>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Arrange the search input and score filter responsively. */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search input that expands to fill the available space. */}
                    <div className="relative flex-1">
                        <Input
                            placeholder="Search the archive"
                            aria-label="Search archive"
                            className="h-11 rounded-full pl-10"
                            value={search}
                            // Update the Redux search filter whenever the input changes.
                            onChange={(e) =>
                                dispatch(setReviewsSearch(e.target.value))
                            }
                        />

                        {/* Position the search icon inside the input. */}
                        <span className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground pointer-events-none">
                            <Search size={16} />
                        </span>
                    </div>

                    {/* Dropdown for filtering reviews by score range. */}
                    <Select
                        value={scoreBucket}
                        onValueChange={(value) =>
                            dispatch(setReviewsScoreBucket(value))
                        }>
                        <SelectTrigger className="h-11 rounded-full w-36">
                            <SelectValue placeholder="Score" />
                        </SelectTrigger>

                        <SelectContent className="rounded-xl">
                            {/* Option for showing reviews with any score. */}
                            <SelectItem value="all">Any score</SelectItem>

                            {/* Show reviews with a high score. */}
                            <SelectItem value="high">High (8.5+)</SelectItem>

                            {/* Show reviews with a mid-range score. */}
                            <SelectItem value="mid">Mid (6.5–8.4)</SelectItem>

                            {/* Show reviews with a low score. */}
                            <SelectItem value="low">Low (&lt;6.5)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
};

export default ReviewsFilters;
