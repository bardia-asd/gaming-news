import { Badge } from "@/components/ui/badge";

import FeaturedNews from "@/components/news/FeaturedNews";
import LatestNews from "@/components/news/LatestNews";
import TrendingNews from "@/components/trending";
import LatestReviews from "@/components/reviews/LatestReviews";

const Home = () => {
    return (
        <>
            <div className="bg-muted border-b border-border hidden lg:block">
                <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Badge className="font-bold text-xs uppercase rounded-full py-1 text-nowrap">
                            PX / Live
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                            PlayStation reveals the first look at its most
                            ambitious world yet
                        </p>
                    </div>

                    <span className="text-muted-foreground uppercase text-xs">
                        3 min read
                    </span>
                </div>
            </div>

            <FeaturedNews />

            <LatestNews />

            <TrendingNews />
            <div className="py-10"></div>

            <LatestReviews />
            <div className="py-10"></div>
        </>
    );
};

export default Home;
