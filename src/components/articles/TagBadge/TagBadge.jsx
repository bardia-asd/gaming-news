import PropTypes from "prop-types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { getTagStyle } from "@/utils/tagStyles";

const TagBadge = ({ tag }) => {
    // Render a tag badge with styling based on the tag slug.
    return (
        <Badge
            variant="outline"
            className={cn("rounded-full", getTagStyle(tag.slug))}>
            {tag.name}
        </Badge>
    );
};

TagBadge.propTypes = {
    tag: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
    }).isRequired,
};

export default TagBadge;
