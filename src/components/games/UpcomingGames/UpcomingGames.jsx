import SectionHeader from "@/components/SectionHeader";
import UpcomingGamesGrid from "./UpcomingGamesGrid";

const UpcomingGames = () => {
    return (
        <section>
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <SectionHeader
                    title="mark your calendar"
                    subtitle="Upcoming games"
                    viewMore={{ label: "View all", href: "/games" }}
                />

                <UpcomingGamesGrid />
            </div>
        </section>
    );
};

export default UpcomingGames;
