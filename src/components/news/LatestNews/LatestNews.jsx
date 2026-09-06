import SectionHeader from "@/components/SectionHeader";
import LatestNewsCarousel from "./LatestNewsCarousel";

const LatestNews = () => {
    return (
        <section>
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <SectionHeader
                    title="Latest News"
                    subtitle="latest"
                    viewMore={{ label: "View all", href: "/news" }}
                />

                <LatestNewsCarousel />
            </div>
        </section>
    );
};

export default LatestNews;
