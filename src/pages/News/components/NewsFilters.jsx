import { useEffect } from "react";
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

import { selectNewsListFilters } from "@/features/news/newsSelectors";
import { setNewsSearch, setNewsTag } from "@/features/news/newsSlice";
import { selectTags, selectTagsStatus } from "@/features/tags/tagsSelectors";
import { fetchAllTags } from "@/features/tags/tagsSlice";

const NewsFilters = () => {
    const tags = useSelector(selectTags);
    const status = useSelector(selectTagsStatus);
    const { search: newsSearch, tag: newsTag } = useSelector(
        selectNewsListFilters,
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") dispatch(fetchAllTags());
    }, [dispatch]);

    return (
        <section>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Input
                            placeholder="Search the archive"
                            aria-label="Search archive"
                            className="h-11 rounded-full pl-10"
                            value={newsSearch}
                            onChange={(e) =>
                                dispatch(setNewsSearch(e.target.value))
                            }
                        />

                        <span className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground pointer-events-none">
                            <Search size={16} />
                        </span>
                    </div>

                    <Select
                        defaultValue={newsTag}
                        onValueChange={(value) => dispatch(setNewsTag(value))}>
                        <SelectTrigger className="h-11 rounded-full w-48">
                            <SelectValue placeholder="Filter by tag" />
                        </SelectTrigger>

                        <SelectContent className="rounded-xl">
                            <SelectItem value="all" className="rounded-lg">
                                All
                            </SelectItem>
                            {tags.map((tag) => (
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

export default NewsFilters;
