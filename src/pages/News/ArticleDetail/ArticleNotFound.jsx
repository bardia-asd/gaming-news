import { FileQuestion } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

// Render a fallback message when the requested article cannot be found.
const ArticleNotFound = ({ error }) => {
    return (
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <div className="flex flex-col items-center justify-center text-center gap-4">
                <div className="flex items-center justify-center size-16 rounded-full bg-secondary">
                    <FileQuestion className="size-8 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Article Not Found
                    </h1>

                    {/* Use the provided error message or show a default message. */}
                    <p className="text-muted-foreground max-w-md">
                        {error ||
                            "The article you're looking for doesn't exist or may have been removed."}
                    </p>
                </div>

                <Button asChild className="mt-2">
                    <Link to="/news">Back to News</Link>
                </Button>
            </div>
        </div>
    );
};

ArticleNotFound.propTypes = {
    error: PropTypes.string,
};

export default ArticleNotFound;
