import { Skeleton } from "@/components/ui/skeleton";

const ArticleDetailSkeleton = () => {
    return (
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex items-center gap-2 mb-5">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-40" />
            </div>

            <div className="flex flex-col gap-4 mb-6">
                <div className="space-y-3">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-4/5" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                </div>

                <Skeleton className="aspect-video w-full rounded-2xl mb-5" />

                <div className="flex items-center justify-between border-y border-border py-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-full" />

                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-40" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Skeleton className="h-3 w-10" />
                        <Skeleton className="size-9 rounded-md" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[88%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        </div>
    );
};

export default ArticleDetailSkeleton;
