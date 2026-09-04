import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={
                theme === "light"
                    ? "Switch to dark theme"
                    : "Switch to light theme"
            }>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
    );
};

export default ThemeSwitch;
