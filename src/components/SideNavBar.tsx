"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import {
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  ChevronLeft,
  BookText,
  House,
  Library,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { ModeToggle } from "./ui/modeTogglebutton";

type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="flex justify-start item-center flex-col relative min-w-[80px] border-r border-secondary px-3 py-4 ">
      {!mobileWidth && (
        <div className="flex justify-center item-center">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight
              style={{ rotate: isCollapsed ? "0deg" : "180deg" }}
              className="transition-all duration-500"
            />
          </Button>
        </div>
      )}

      <div className="flex justify-center item-center mt-8">
        <Image
          src={logo.src}
          alt="logo"
          width={logo.width}
          height={logo.height}
          style={{ width: isCollapsed ? "30px" : "80px" }}
          className="aspect-square cursor-pointer mx-auto"
        />
      </div>

      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Users",
            href: "#",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "#",
            icon: Settings,
            variant: "ghost",
          },
          {
            title: "Skill Matrix",
            href: "/dashboard/skillmatrix",
            icon: BookText,
            variant: "ghost",
          },
          {
            title: "Asset Maintenance",
            href: "/dashboard/assetMaintenance",
            icon: BookText,
            variant: "ghost",
          },
          {
            title: "Calibration Schedule",
            href: "/dashboard/caliberation_Schedule",
            icon: BookText,
            variant: "ghost",
          },
          {
            title: "NC Output",
            href: "/dashboard/ncOutput",
            icon: BookText,
            variant: "ghost",
          },
          {
            title: "Documented Information",
            href: "/dashboard/documentedInformation",
            icon: BookText,
            variant: "ghost",
          },
          {
            title: "Home",
            href: "#",
            icon: House,
            variant: "ghost",
          },
          {
            title: "Accounts",
            href: "#",
            icon: User,
            variant: "ghost",
          },
          {
            title: "Categories",
            href: "#",
            icon: Library,
            variant: "ghost",
          },
        ]}
      />

      <div className="px-2 space-x-6 py-2">
        <ModeToggle />
      </div>
    </div>
  );
}
