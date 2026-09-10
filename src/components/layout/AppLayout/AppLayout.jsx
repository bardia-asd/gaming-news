import { Outlet } from "react-router";
import Header from "../Header";
import Footer from "../Footer";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "./ScorllToTop";

const AppLayout = () => {
    return (
        <div className="min-h-dvh bg-background text-foreground flex flex-col">
            <ScrollToTop />
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />

            <Toaster />
        </div>
    );
};

export default AppLayout;
