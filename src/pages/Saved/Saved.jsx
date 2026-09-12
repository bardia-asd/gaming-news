import PageHeader from "@/components/layout/PageHeader";
import SavedNewsGrid from "./components/SavedNewsGrid";

const Saved = () => {
    return (
        <>
            <PageHeader
                eyebrow="your library"
                title="Saved News"
                description="Stories you want to come back to, kept in one place."
                currentPage="Saved News"
            />

            <SavedNewsGrid />
        </>
    );
};

export default Saved;
