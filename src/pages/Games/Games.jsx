import PageHeader from "@/components/layout/PageHeader";
import GamesFilters from "./components/GamesFilters";
import GamesList from "./components/GamesList";

const Games = () => {
    return (
        <>
            <PageHeader
                eyebrow="the library"
                title="Games"
                description="Discover games, upcoming releases, and what to play next."
                currentPage="Games"
            />

            <GamesFilters />

            <GamesList />
        </>
    );
};

export default Games;
