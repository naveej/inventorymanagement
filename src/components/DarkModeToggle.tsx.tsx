import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        className="sr-only"
      />
      <div className="relative">
        <div
          className={`block w-[4rem] h-8 rounded-full ${
            theme === "light" ? "bg-gray-200" : "bg-gray-800"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 w-12 h-6 rounded-full transition-transform transform ${
            theme === "light" ? "translate-x-0" : "translate-x-7"
          }`}
        >
          {theme === "light" ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </div>
      </div>
    </label>
  );
};

export default DarkModeToggle;
