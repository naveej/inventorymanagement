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
    <div className="flex justify-start items-center flex-col relative min-w-[80px] border-r border-secondary px-3 py-4">
      {!mobileWidth && (
        <div className="flex justify-center items-center">
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

      <div className="flex justify-center items-center mt-8">
        <Image
          src={logo.src}
          alt="logo"
          width={logo.width}
          height={logo.height}
          style={{ width: isCollapsed ? "30px" : "80px" }}
          className="aspect-square cursor-pointer mx-auto"
        />
      </div>

      <Nav isCollapsed={mobileWidth ? true : isCollapsed} links={[]}>
        <Accordion type="single" collapsible>
          <AccordionItem value="main">
            <AccordionTrigger>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {!isCollapsed && "Main"}
            </AccordionTrigger>
            <AccordionContent>
              {
                <Link href="/" className="flex items-center py-1">
                  <House className="mr-2 h-4 w-4" />
                  {!isCollapsed && "Home"}
                </Link>
              }
              <Link href="#" className="flex items-center py-1">
                <UsersRound className="mr-2 h-4 w-4" />
                {!isCollapsed && "Users"}
              </Link>
              <Link href="#" className="flex items-center py-1">
                <Settings className="mr-2 h-4 w-4" />
                {!isCollapsed && "Settings"}
              </Link>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="forms">
            <AccordionTrigger>
              <BookPlus className="mr-2 h-4 w-4" />
              {!isCollapsed && "Forms"}
            </AccordionTrigger>
            <AccordionContent>
              <Link
                href="/dashboard/skillmatrix"
                className="flex items-center py-1"
              >
                <BookText className="mr-2 h-4 w-4" />
                {!isCollapsed && "Skill Matrix"}
              </Link>
              <Link
                href="/dashboard/assetMaintenance"
                className="flex items-center py-1"
              >
                <BookText className="mr-2 h-4 w-4" />
                {!isCollapsed && "Asset Maintenance"}
              </Link>
              <Link
                href="/dashboard/caliberation_Schedule"
                className="flex items-center py-1"
              >
                <BookText className="mr-2 h-4 w-4" />
                {!isCollapsed && "Calibration Schedule"}
              </Link>
              <Link
                href="/dashboard/ncOutput"
                className="flex items-center py-1"
              >
                <BookText className="mr-2 h-4 w-4" />
                {!isCollapsed && "NC Output"}
              </Link>
              <Link
                href="/dashboard/documentedInformation"
                className="flex items-center py-1"
              >
                <BookText className="mr-2 h-4 w-4" />
                {!isCollapsed && "Documented Information"}
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Nav>

      <div className="px-2 space-x-6 py-2">
        <ModeToggle />
      </div>
    </div>
  );
}
