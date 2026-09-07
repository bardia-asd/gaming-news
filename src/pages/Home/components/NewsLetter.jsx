import { useState } from "react";
import { Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Render the newsletter signup section with a controlled email input.
const NewsLetter = () => {
    // Store the current email input value.
    const [email, setEmail] = useState("");

    // Handle newsletter signup and reset the form after submission.
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ignore submissions when the input contains only whitespace.
        if (!email.trim()) return;

        alert(`Thanks for subscribing! We'll send updates to ${email}.`);

        // Clear the input after a successful submission.
        setEmail("");
    };

    return (
        <section>
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 bg-linear-to-r from-primary-soft to-surface rounded-2xl border border-border px-6 py-5 lg:p-7">
                    <div>
                        <span className="uppercase tracking-widest text-[10px] font-bold text-muted-foreground">
                            the weekly drop
                        </span>

                        <h2 className="text-2xl lg:text-3xl my-3">
                            Never miss what's next.
                        </h2>

                        <p className="text-muted-foreground">
                            One sharp dispatch of the stories, games, and ideas
                            worth your time.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <span className="absolute top-1/2 -translate-y-1/2 left-4 text-muted-foreground pointer-events-none hidden sm:inline">
                                <Mail size={18} />
                            </span>

                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                aria-label="Email address"
                                className="h-16 rounded-full sm:pl-11 pr-30"
                                required
                            />

                            <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="font-semibold rounded-full">
                                    Subscribe
                                </Button>
                            </div>
                        </div>

                        <p className="text-muted-foreground text-xs mt-3">
                            By subscribing, you agree to our terms.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;
