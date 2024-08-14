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
  BookPlus,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { ModeToggle } from "./ui/modeTogglebutton";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
      <div className="mr-4">
        <div className="self-start px-2 py-2">
          <Accordion
            data-state="closed"
            type="single"
            collapsible={isCollapsed}
            className="w-full bg-red-500 rounded"
          >
            <AccordionItem value="documentation">
              <AccordionTrigger className="self-start">
                <BookPlus className="size-4" />
                <span className="!hover:no-underline p-2">Forms</span>
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="/dashboard/skillmatrix"
                  className="flex items-center py-1"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  Skill Matrix
                </Link>
                <Link
                  href="/dashboard/assetMaintenance"
                  className="flex items-center py-1"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  Asset Maintenance
                </Link>
                <Link
                  href="/dashboard/caliberation_Schedule"
                  className="flex items-center py-1"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  Calibration Schedule
                </Link>
                <Link
                  href="/dashboard/ncOutput"
                  className="flex items-center py-1"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  NC Output
                </Link>
                <Link
                  href="/dashboard/documentedInformation"
                  className="flex items-center py-1"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  Documented Information
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="px-2 space-x-6 py-2">
        <ModeToggle />
      </div>
    </div>
  );
}
