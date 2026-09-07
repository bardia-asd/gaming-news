const SCORE_TIERS = [
    {
        min: 8,
        style: "bg-score-excellent text-score-foreground",
    },
    {
        min: 6,
        style: "bg-score-good text-score-foreground",
    },
    {
        min: 4,
        style: "bg-score-mixed text-score-foreground",
    },
    {
        min: 0,
        style: "bg-score-poor text-score-foreground",
    },
];

const DEFAULT_SCORE_STYLE = "bg-muted text-muted-foreground border-muted/30";

export const getScoreStyle = (score) => {
    if (typeof score !== "number" || isNaN(score)) {
        return DEFAULT_SCORE_STYLE;
    }

    const tier = SCORE_TIERS.find((t) => score > t.min);
    return tier ? tier.style : DEFAULT_SCORE_STYLE;
};
