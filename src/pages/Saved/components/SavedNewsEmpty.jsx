import { Bookmark } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const SavedNewsEmpty = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="flex items-center justify-center size-14 rounded-full bg-secondary mb-4">
                <Bookmark className="size-6 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-semibold">No saved stories</h2>

            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Save stories you want to read later and they'll appear here.
            </p>

            <Button asChild className="mt-5">
                <Link to="/news">Explore News</Link>
            </Button>
        </div>
    );
};

export default SavedNewsEmpty;
