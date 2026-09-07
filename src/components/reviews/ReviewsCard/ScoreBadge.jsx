import { Badge } from "@/components/ui/badge";
import { getScoreStyle } from "../utils/scoreStyle";
import { cn } from "@/utils/utils";

const ScoreBadge = ({ score }) => {
    return <Badge className={cn("text-sm", getScoreStyle(score))}>{score}</Badge>;
};

export default ScoreBadge;
