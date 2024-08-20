"use client";

import { useEffect, useState } from "react";
import { Nav } from "./ui/nav";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import {
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  BookText,
  House,
  BookPlus,
  Shield,
  LogOut,
  UserRoundPen,
  UserPlus,
  Users,
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
import DarkModeToggle from "./DarkModeToggle.tsx";
import SidebarDarkModeToggle from "./Sidebar_DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import UserProfile from "./customUI/UserProfile";

type Props = {};

export default function SideNavbar({ }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  const isAdmin = session?.user?.role === 'admin';
  const links:any = [
    {
      title: "Home",
      href: "/",
      icon: House,
      variant: "ghost",
    },
    {
      title: "Profile",
      href: "/forms/UpdateProfile",
      icon: UserRoundPen,
      variant: "ghost",
    },
    ...(isAdmin
      ? [
          {
            title: "AddUsers",
            href: "/adminDashboard/userCreation",
            icon: UserPlus,
            variant: "ghost",
          },
          {
            title: "Users",
            href: "/adminDashboard/userManage",
            icon: Users,
            variant: "ghost",
          },
        ]
      : []),
  ];
  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  useEffect(() => {
    if (status === "unauthenticated") {
      return undefined;
    }
    if (!session) {
      router.push("/login");
    }
  }, [router, session, status]);
  if (!session) {
    return null;
  }
  const role = session?.user?.role;

  return (
    <div className="flex justify-start items-center flex-col relative min-w-[80px] border-r border-secondary px-3 py-4">
      {!mobileWidth ? (
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
      ) : (
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
        <a href="/">
          <Image
            src={logo.src}
            alt="logo"
            width={logo.width}
            height={logo.height}
            style={{ width: isCollapsed ? "30px" : "80px" }}
            className="aspect-square cursor-pointer mx-auto"
          />
        </a>
      </div>
      <div className="w-full px-2 py-2">
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={links}
        />
      </div>

      <div
        className={cn(
          "px-2 py-2",
          isCollapsed ? "min-w-full" : "min-w-[250px]"
        )}
      >
        <Accordion type="single" collapsible>
            <AccordionItem value="Tables">
              <AccordionTrigger>
                <BookPlus size={20} className="mr-1 self-start" />
                {!isCollapsed && (
                  <span className="hover:!no-underline text-start pl-2 w-full">
                    Tables
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {/* <Link
                href="/dashboard/skillmatrix"
                className="flex items-center py-1"
              >
                <BookText className="mr-2 h-4 w-4" />
                {!isCollapsed && "Skill Matrix"}
              </Link> */}
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

          {!isAdmin && (
            <AccordionItem value="Forms">
              <AccordionTrigger>
                <BookPlus size={20} className="mr-1 self-start" />
                {!isCollapsed && (
                  <span className="hover:!no-underline text-start pl-2 w-full">
                    Forms
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {/* <Link
                href="/forms/skillmatrix"
                className="flex items-center py-1"
              >
                <BookText className="mr-2 h-4 w-4" />
                {!isCollapsed && "Skill Matrix"}
              </Link> */}
                <Link
                  href="/forms/AssetMaintenanceform"
                  className="flex items-center py-1"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  {!isCollapsed && "Asset Maintenance"}
                </Link>
                <Link
                  href="/forms/CaliberationScheduleform"
                  className="flex items-center py-1"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  {!isCollapsed && "Calibration Schedule"}
                </Link>
                <Link
                  href="/forms/NC-Outputform"
                  className="flex items-center py-1"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  {!isCollapsed && "NC Output"}
                </Link>
                <Link
                  href="/forms/DocumentedInformationform"
                  className="flex items-center py-1"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  {!isCollapsed && "Documented Information"}
                </Link>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>

      <div className="px-2 space-x-6 py-4">
        {/* <ModeToggle /> */}
        {isCollapsed ? <SidebarDarkModeToggle /> : <DarkModeToggle />}
      </div>
      {/* <div className="px-2 py-2 cursor-pointer border border-border hover:bg-primary/20 rounded-lg">
        {isCollapsed ? (
          <Shield color="#ff2600" />
        ) : (
          <Link
            href="/adminDashboard"
            className="flex gap-2 text-red-600 text-sm items-center rounded-lg transition ease-in duration-200"
          >
            <Shield /> Admin <br></br>Dashboard
          </Link>
        )}
      </div> */}
      <div className="flex flex-col gap-4 mt-auto w-full px-2 py-2">
        <UserProfile isCollapsed={isCollapsed} />

        <Button
          onClick={() => signOut({ callbackUrl: "/login" })}
          variant="ghost"
          className="w-full flex items-center justify-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
