export const TAG_COLORS = {
    esports: "bg-tag-esports/15 text-tag-esports border-tag-esports/30",
    rpg: "bg-tag-rpg/15 text-tag-rpg border-tag-rpg/30",
    "nintendo-switch":
        "bg-tag-nintendo-switch/15 text-tag-nintendo-switch border-tag-nintendo-switch/30",
    dlc: "bg-tag-dlc/15 text-tag-dlc border-tag-dlc/30",
    pc: "bg-tag-pc/15 text-tag-pc border-tag-pc/30",
    playstation:
        "bg-tag-playstation/15 text-tag-playstation border-tag-playstation/30",
    shooter: "bg-tag-shooter/15 text-tag-shooter border-tag-shooter/30",
    industry: "bg-tag-industry/15 text-tag-industry border-tag-industry/30",
    indie: "bg-tag-indie/15 text-tag-indie border-tag-indie/30",
    xbox: "bg-tag-xbox/15 text-tag-xbox border-tag-xbox/30",
};

const DEFAULT_TAG_STYLE =
    "bg-secondary text-secondary-foreground border-border";

export const getTagStyle = (slug) => TAG_COLORS[slug] ?? DEFAULT_TAG_STYLE;
