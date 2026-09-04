import { Link } from "react-router";

const Footer = () => {
    // Renders the site footer with branding, navigation links, and social links.
    return (
        <footer className="bg-muted border-t border-border pt-12 pb-6">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Footer navigation and branding sections. */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 sm:gap-6 px-6">
                    <div className="flex flex-col gap-3 sm:col-span-2">
                        <Link to="/" className="uppercase font-black">
                            <span className="text-primary">px</span> / playback
                        </Link>

                        <p className="text-sm text-muted-foreground">
                            Stories for people who play.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">
                            explore
                        </h4>

                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            News
                        </Link>

                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Reviews
                        </Link>

                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Games
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">
                            follow
                        </h4>

                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Instagram
                        </Link>

                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            YouTube
                        </Link>

                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Bluesky
                        </Link>
                    </div>
                </div>

                {/* Copyright and footer tagline. */}
                <div className="flex items-center justify-between px-4 sm:px-6 pt-4 border-t border-border mt-8">
                    <p className="text-xs text-muted-foreground">
                        © 2026 Playback Media
                    </p>

                    <p className="text-xs text-muted-foreground">
                        Built for the next level.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
