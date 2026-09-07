import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ReviewsCardSkeleton = () => {
    return (
        <article>
            <Card className="overflow-hidden">
                {/* Cover image */}
                <div className="relative aspect-16/10">
                    <Skeleton className="size-full rounded-none" />
                    {/* Score badge */}
                    <div className="absolute top-4 right-4">
                        <Skeleton className="w-12 h-7 rounded-md" />
                    </div>
                </div>
                <CardContent className="p-5 flex flex-col gap-2">
                    {/* Title */}
                    <Skeleton className="h-5 w-4/5" />
                    {/* Excerpt */}
                    <div className="space-y-2 h-16">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                    {/* Author */} <Skeleton className="h-3 w-32" />
                </CardContent>
            </Card>
        </article>
    );
};
export default ReviewsCardSkeleton;
