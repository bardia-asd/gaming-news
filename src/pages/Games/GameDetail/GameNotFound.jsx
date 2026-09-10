import { Gamepad2 } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const GameNotFound = ({ error }) => {
    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <div className="flex flex-col items-center justify-center text-center gap-4">
                <div className="flex items-center justify-center size-16 rounded-full bg-secondary">
                    <Gamepad2 className="size-8 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Game Not Found
                    </h1>

                    <p className="text-muted-foreground max-w-md">
                        {error ||
                            "The game you're looking for doesn't exist or may have been removed."}
                    </p>
                </div>

                <Button asChild className="mt-2">
                    <Link to="/games">Back to Games</Link>
                </Button>
            </div>
        </div>
    );
};

export default GameNotFound;
