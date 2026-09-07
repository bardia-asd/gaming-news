import SectionHeader from "@/components/SectionHeader";
import LatestReviewsCarousel from "./LatestReviewsCarousel";

// Render the latest reviews section with a link to view all reviews.
const LatestReviews = () => {
    return (
        <section className="bg-muted border-y border-border">
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <SectionHeader
                    title="Reviews"
                    subtitle="the verdict"
                    viewMore={{ label: "View all", href: "/reviews" }}
                />

                <LatestReviewsCarousel />
            </div>
        </section>
    );
};

export default LatestReviews;
