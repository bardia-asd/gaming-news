import PageHeader from "@/components/layout/PageHeader";
import ReviewsFilters from "./components/ReviewsFilters";
import ReviewsList from "./components/ReviewsList";

const Reviews = () => {
    return (
        <>
            <PageHeader
                eyebrow="our verdict"
                title="Reviews"
                description="Our takes on the latest games worth your time."
                currentPage="Reviews"
            />

            <ReviewsFilters />

            <ReviewsList />
        </>
    );
};

export default Reviews;
