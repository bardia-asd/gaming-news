import { AlertCircle } from "lucide-react";

const SavedNewsError = ({ error }) => {
    return (
        <div className="container max-w-7xl mx-auto px-4 lg:px-6 py-20">
            <div className="flex flex-col items-center justify-center text-center gap-3">
                <AlertCircle className="size-8 text-destructive" />

                <h2 className="text-xl font-semibold">
                    Couldn't load saved stories
                </h2>

                <p className="text-sm text-muted-foreground max-w-md">
                    {error ||
                        "Something went wrong while loading your saved stories."}
                </p>
            </div>
        </div>
    );
};

export default SavedNewsError;
