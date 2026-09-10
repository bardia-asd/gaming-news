import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ReviewDetailSkeleton = () => {
    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex items-center gap-2 mb-5">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
            </div>

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
                            <Skeleton className="h-4 w-28" />
                        </div>

                        <div className="flex flex-col gap-2 py-4">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-16 w-full rounded-xl" />
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section className="my-6 space-y-4">
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-2/3" />

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[95%]" />
                        <Skeleton className="h-4 w-[85%]" />
                    </div>
                </div>

                <Card>
                    <CardContent className="p-4 flex flex-col gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-7 w-16" />
                        <Skeleton className="h-3 w-28" />
                    </CardContent>
                </Card>
            </section>

            <section>
                <div className="mb-5 space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-7 w-36" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Card>
                        <CardContent className="flex flex-col gap-3 p-5">
                            <div className="flex items-center gap-2">
                                <Skeleton className="size-4 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>

                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex flex-col gap-3 p-5">
                            <div className="flex items-center gap-2">
                                <Skeleton className="size-4 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>

                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default ReviewDetailSkeleton;
