import { useEffect, useState } from "react";

export const useTheme = () => {
    // Initialize the theme from localStorage, falling back to light mode.
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light",
    );

    useEffect(() => {
        const root = document.documentElement;

        // Apply the current theme to the root element.
        root.classList.toggle("dark", theme === "dark");

        // Persist the selected theme for the next visit.
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Toggle between light and dark themes.
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme };
};
