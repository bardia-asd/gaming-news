import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const GameCardSkeleton = () => {
    return (
        <Card className="overflow-hidden h-full">
            {/* Cover image */}
            <div className="aspect-16/10">
                <Skeleton className="size-full rounded-none" />
            </div>
            <CardContent className="flex flex-col gap-2 p-5">
                {/* Title */}
                <Skeleton className="h-5 w-4/5" />
                {/* Platforms */}
                <div className="flex items-center gap-2 min-h-4">
                    <Skeleton className="h-3 w-3/5" />
                </div>
                {/* Release date */}
                <Skeleton className="h-3 w-24" />
            </CardContent>
        </Card>
    );
};
export default GameCardSkeleton;
