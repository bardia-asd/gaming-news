import { Link } from "react-router";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const SectionHeader = ({ title, subtitle, viewMore }) => {
    // Render the section title and subtitle with an optional view-more link.
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-border">
            <div>
                <span className="uppercase tracking-widest text-primary text-[10px] font-bold">
                    {subtitle}
                </span>

                <h2 className="tracking-tight text-2xl lg:text-3xl mt-2">
                    {title}
                </h2>
            </div>

            {/* Display the view-more link when a destination is provided. */}
            {viewMore && (
                <Button
                    variant="outline"
                    className="rounded-full text-primary h-auto py-2 shadow-none"
                    asChild>
                    <Link to={viewMore.href}>
                        {viewMore.label}
                        <ArrowUpRight size={16} />
                    </Link>
                </Button>
            )}
        </div>
    );
};

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    viewMore: PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
    }),
};

export default SectionHeader;
