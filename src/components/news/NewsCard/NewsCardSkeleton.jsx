import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const NewsCardSkeleton = () => {
    return (
        <article className="group relative">
            <Card className="overflow-hidden">
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden">
                    <Skeleton className="size-full rounded-none" />
                </div>

                <CardContent className="p-5 flex flex-col gap-2">
                    {/* Tags */}
                    <div className="flex gap-2 mb-1">
                        <Skeleton className="h-5 w-14 rounded-full" />
                        <Skeleton className="h-5 w-18 rounded-full" />
                    </div>

                    {/* Title */}
                    <Skeleton className="h-5 w-4/5" />

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>

                    {/* Date */}
                    <Skeleton className="h-3 w-24 mt-1" />
                </CardContent>
            </Card>

            {/* Bookmark */}
            <Skeleton className="absolute top-3 right-3 size-8 rounded-md" />
        </article>
    );
};

export default NewsCardSkeleton;
