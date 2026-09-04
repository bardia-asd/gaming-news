import { Outlet } from "react-router";
import Header from "../Header";

const AppLayout = () => {
    return (
        <div className="min-h-dvh bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
