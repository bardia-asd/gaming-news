import { Skeleton } from "@/components/ui/skeleton";

const FeaturedNewsSkeleton = () => {
    return (
        <section>
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Featured article */}
                    <div className="relative min-h-96 lg:min-h-112 lg:col-span-2 rounded-2xl overflow-hidden">
                        <Skeleton className="absolute inset-0 size-full" />

                        <div className="relative z-10 flex flex-col h-full justify-end gap-3 p-6">
                            {/* Tags */}
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <Skeleton className="h-8 lg:h-10 w-4/5" />
                                <Skeleton className="h-8 lg:h-10 w-3/5" />
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2 max-w-lg">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>

                            {/* Metadata */}
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-3 w-1" />
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="ml-auto h-4 w-24" />
                            </div>
                        </div>
                    </div>

                    {/* Secondary articles */}
                    <div className="grid grid-rows-2 gap-5">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div
                                key={index}
                                className="relative min-h-50 rounded-2xl overflow-hidden">
                                <Skeleton className="absolute inset-0 size-full" />

                                <div className="relative z-10 flex flex-col h-full justify-end gap-3 p-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-full" />
                                        <Skeleton className="h-5 w-4/5" />
                                    </div>

                                    {/* Date */}
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedNewsSkeleton;
