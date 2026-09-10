import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const GameDetailSkeleton = () => {
    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-5">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Hero + info */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <Skeleton className="lg:col-span-2 min-h-105 rounded-2xl" />

                <Card>
                    <CardContent className="p-5 divide-y divide-border">
                        <div className="flex flex-col gap-2 py-4">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-4 w-40" />
                        </div>

                        <div className="flex flex-col gap-2 py-4">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-4 w-32" />
                        </div>

                        <div className="flex flex-col gap-2 py-4">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>

                        <div className="flex flex-col gap-2 py-4">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-4 w-40" />
                        </div>

                        <div className="flex flex-col gap-2 py-4">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Description */}
            <section className="mt-8 space-y-3">
                <Skeleton className="h-6 w-36" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[85%]" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </section>
        </div>
    );
};

export default GameDetailSkeleton;
