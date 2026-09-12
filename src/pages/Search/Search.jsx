import PageHeader from "@/components/layout/PageHeader";
import SearchGrid from "./components/SearchGrid";
import { useSearchParams } from "react-router";

const Search = () => {
    const [searchParams] = useSearchParams();

    return (
        <>
            <PageHeader
                eyebrow="search results"
                title={`Results for "${searchParams.get("q")}"`}
                description="Search for stories and games across the site."
                currentPage="Search"
            />

            <SearchGrid />
        </>
    );
};

export default Search;
