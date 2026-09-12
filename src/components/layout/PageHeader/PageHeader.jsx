import PropTypes from "prop-types";
    
import {
    Breadcrumbs,
    BreadcrumbsList,
    BreadcrumbsItem,
    BreadcrumbsLink,
    BreadcrumbsPage,
    BreadcrumbsSeparator,
} from "@/components/ui/breadcrumb";

// Render a reusable page header with breadcrumbs, an eyebrow label,
// a page title, and a short description.
const PageHeader = ({ eyebrow, title, description, currentPage }) => {
    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
            {/* Navigation breadcrumbs for the current page. */}
            <Breadcrumbs>
                <BreadcrumbsList className="mb-5">
                    {/* Link back to the homepage. */}
                    <BreadcrumbsItem>
                        <BreadcrumbsLink
                            href="/"
                            className="hover:text-primary">
                            Home
                        </BreadcrumbsLink>
                    </BreadcrumbsItem>

                    {/* Separate the homepage from the current page. */}
                    <BreadcrumbsSeparator />

                    {/* Display the current page as the final breadcrumb. */}
                    <BreadcrumbsItem>
                        <BreadcrumbsPage>{currentPage}</BreadcrumbsPage>
                    </BreadcrumbsItem>
                </BreadcrumbsList>
            </Breadcrumbs>

            {/* Display the small uppercase label above the page title. */}
            <span className="text-primary tracking-widest uppercase text-[10px] font-bold">
                {eyebrow}
            </span>

            {/* Display the main page title. */}
            <h1 className="my-3 text-3xl lg:text-4xl">{title}</h1>

            {/* Display a short description explaining the page. */}
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
};

PageHeader.propTypes = {
    // Small label displayed above the page title.
    eyebrow: PropTypes.string.isRequired,

    // Main heading displayed on the page.
    title: PropTypes.string.isRequired,

    // Short description displayed below the title.
    description: PropTypes.string.isRequired,

    // Current page name displayed in the final breadcrumb.
    currentPage: PropTypes.string.isRequired,
};

export default PageHeader;
