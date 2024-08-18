import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Sidebar_DarkModeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
        <Moon className="hidden h-5 w-5 dark:block" />
      </Button>
    </div>
  );
};

export default Sidebar_DarkModeToggle;
