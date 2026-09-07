import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Button } from "@/components/ui/button";
import {
    selectLatestReviews,
    selectLatestReviewsStatus,
} from "@/features/reviews/reviewsSelectors";
import { fetchLatestReviews } from "@/features/reviews/reviewsSlice";
import ReviewsCard, { ReviewsCardSkeleton } from "../ReviewsCard";

// Render the latest reviews in a responsive carousel with external navigation controls.
const LatestReviewsCarousel = () => {
    // Store the Swiper instance for controlling the carousel externally.
    const swiperRef = useRef(null);

    // Retrieve the latest reviews and their request status from Redux.
    const latestReviews = useSelector(selectLatestReviews);
    const status = useSelector(selectLatestReviewsStatus);

    const dispatch = useDispatch();

    // Fetch the latest reviews when the component mounts.
    useEffect(() => {
        dispatch(fetchLatestReviews());
    }, [dispatch]);

    // Show skeleton cards before the initial request completes.
    const isLoading = status === "idle" || status === "loading";

    return (
        <div className="relative lg:px-12">
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1.1}
                breakpoints={{
                    425: { slidesPerView: 1.6 },
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.2 },
                    1440: { slidesPerView: 4 },
                }}
                spaceBetween={20}>
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <SwiperSlide key={index}>
                              <ReviewsCardSkeleton />
                          </SwiperSlide>
                      ))
                    : latestReviews.map((item) => (
                          <SwiperSlide key={item.id}>
                              <ReviewsCard review={item} />
                          </SwiperSlide>
                      ))}
            </Swiper>

            {/* External controls for navigating between carousel slides. */}
            <div className="absolute inset-0 hidden lg:flex items-center justify-between">
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous">
                    <ChevronLeft size={18} />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next">
                    <ChevronRight size={18} />
                </Button>
            </div>
        </div>
    );
};

export default LatestReviewsCarousel;
