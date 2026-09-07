import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const TrendingNewsCardSkeleton = () => {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 p-4">
                {/* Index */}
                <Skeleton className="h-6 w-6" />

                {/* Image */}
                <div className="rounded-lg overflow-hidden w-24 aspect-16/10 shrink-0">
                    <Skeleton className="size-full rounded-none" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    {/* Tags */}
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-14 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>

                    {/* Title */}
                    <Skeleton className="h-5 w-4/5" />

                    {/* Date */}
                    <Skeleton className="h-3 w-24" />
                </div>

                {/* Arrow */}
                <Skeleton className="size-5 shrink-0 rounded" />
            </CardContent>
        </Card>
    );
};

export default TrendingNewsCardSkeleton;
