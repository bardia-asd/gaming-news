import PageHeader from "@/components/layout/PageHeader";
import NewsFilters from "./components/NewsFilters";
import NewsList from "./components/NewsList";

const News = () => {
    return (
        <>
            <PageHeader
                eyebrow="the archive"
                title="Latest News"
                description="The latest stories, updates, and announcements from gaming."
                currentPage="News"
            />

            <NewsFilters />

            <NewsList />
        </>
    );
};

export default News;
