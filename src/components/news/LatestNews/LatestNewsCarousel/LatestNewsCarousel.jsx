import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import {
    selectLatestNews,
    selectLatestNewsStatus,
} from "@/features/news/newsSelectors";
import { fetchLatestNews } from "@/features/news/newsSlice";

import { Button } from "@/components/ui/button";
import NewsCard, { NewsCardSkeleton } from "@/components/news/NewsCard";

const LatestNewsCarousel = () => {
    // Store the Swiper instance for controlling the carousel externally.
    const swiperRef = useRef(null);

    // Retrieve the latest news and its request status from Redux.
    const latestNews = useSelector(selectLatestNews);
    const status = useSelector(selectLatestNewsStatus);

    const dispatch = useDispatch();

    // Fetch the six most recent news articles when the component mounts.
    useEffect(() => {
        dispatch(fetchLatestNews(6));
    }, [dispatch]);

    // Show skeleton cards before the initial request completes.
    const isLoading = status === "idle" || status === "loading";

    return (
        <div className="relative px-12">
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView="auto"
                breakpoints={{
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                spaceBetween={20}>
                {/* Render skeleton cards while the news data is loading. */}
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <SwiperSlide key={index}>
                              <NewsCardSkeleton />
                          </SwiperSlide>
                      ))
                    : latestNews.map((item) => (
                          <SwiperSlide key={item.id}>
                              <NewsCard article={item} />
                          </SwiperSlide>
                      ))}
            </Swiper>

            {/* External controls for navigating between carousel slides. */}
            <div className="absolute inset-0 flex items-center justify-between">
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

export default LatestNewsCarousel;
