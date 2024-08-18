"use client";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExtendedColumnDef } from "@/app/_types/utility.types";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

interface SkillMatrixForm {
  _id: string;
  docNo: string;
  version: string;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  departmentName: string;
  name: string;
  skills: string[];
  lastUpdated: string;
  [key: string]: any;
}

// Function to fetch data
async function fetchData(): Promise<SkillMatrixForm[]> {
  const response = await fetch("/api/get/forms/skillMatrix");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.map((item: any) => ({
    _id: item._id,
    docNo: item.metadata.docNo,
    version: item.metadata.version,
    preparedBy: item.metadata.preparedBy,
    reviewedBy: item.metadata.reviewedBy,
    approvedBy: item.metadata.approvedBy,
    departmentName: item.metadata.departmentName,
    name: item.name,
    skills: item.skills,
    lastUpdated: new Date(item.lastUpdated).toLocaleDateString(),
  }));
}

async function deleteRow(id: string, refreshData: () => void) {
  try {
    const response = await axios.delete(`/api/post/delete/skillMatrix`, {
      data: { id },
    });
    if (response.status === 200) {
      toast.success("Row deleted successfully!");
      refreshData();
    } else {
      throw new Error(response.data.message || "Failed to delete the row");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle known errors from the server
      toast.error(`Failed to delete row: ${error.response.data.message}`);
    } else {
      // Handle unknown errors
      toast.error("Failed to delete row. Please try again later.");
    }
    console.error("Error deleting row:", error);
  }
}

export default function DemoPage() {
  const [data, setData] = useState<SkillMatrixForm[]>([]);
  const [columns, setColumns] = useState<ExtendedColumnDef<SkillMatrixForm>[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>();

  const refreshData = async () => {
    try {
      const result = await fetchData();
      const updatedResult = result.map((item) => {
        const updatedSkill = item.skills.map((skill, index) => ({
          [`skill${index}`]: skill,
        }));

        return {
          ...item,
          ...updatedSkill.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
        };
      });
      // Find the latest lastUpdated date
      const latestLastUpdated = updatedResult.reduce((latest, item) => {
        const itemDate = new Date(item.lastUpdated);
        return itemDate > new Date(latest) ? item.lastUpdated : latest;
      }, updatedResult[0]?.lastUpdated || "");

      setData(updatedResult);
      setLastUpdated(latestLastUpdated);

      // Determine the maximum number of skills in the fetched data
      const maxSkills = Math.max(...result.map((item) => item.skills.length));

      const updatedColumns: ExtendedColumnDef<SkillMatrixForm>[] = [
        {
          accessorKey: "name",
          header: ({ column }) => {
            return (
              <Button
                className="p-0"
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
        },
        // Dynamically generate columns for skills based on the maximum number of skills
        ...Array.from({ length: maxSkills }).map((_, i) => ({
          accessorKey: `skill${i}`,
          header: `Skill ${i + 1}`,
        })),
        {
          id: "actions",
          className: "text-right",
          cell: ({ row }) => {
            const [data, setData] = useState(row.original);
            const [loading, setLoading] = useState(false);

            const handleDelete = async (id: string) => {
              if (
                window.confirm("Are you sure you want to delete this item?")
              ) {
                setLoading(true);
                await deleteRow(id, refreshData);
                setLoading(false);
              }
            };

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="dark:bg-slate-800 dark:border-slate-700 bg-white border-gray-300 shadow-lg"
                >
                  <DropdownMenuLabel className="dark:text-white text-black">
                    Actions
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    className="dark:hover:bg-slate-700 hover:bg-gray-100"
                    onClick={() => {
                      if (data._id) {
                        navigator.clipboard.writeText(data._id);
                      } else {
                        console.error("_id is undefined");
                      }
                    }}
                  >
                    Copy Entry ID
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark:hover:bg-slate-700 hover:bg-gray-100">
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      if (data._id) {
                        await handleDelete(data._id);
                      } else {
                        console.error("_id is undefined");
                      }
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ];

      setColumns(updatedColumns);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="animate-pulse bg-gray-700 px-2 rounded-md py-5 w-1/2 justify-center mx-auto"></div>
        {/* --- Header --- */}
        <div className="bg-slate-100 dark:bg-slate-900 py-4 mt-6 p-4 max-w-[93rem] px-4 mx-auto border-2 border-slate-600 rounded-lg">
          <div className="flex text-center mb-4 border-b-2 border-gray-600 pb-2">
            <div className="w-20 aspect-square bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-1/2 mx-auto justify-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 rounded-md">
            <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          </div>

          {/* --- Database --- */}
          <div className="justify-center px-12 py-6">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.2,
      }}
    >
      <div className="text-center text-3xl font-bold py-4 dark:text-white text-black">
        Skill Matrix
      </div>
      {/* --- Header --- */}
      <div className="bg-slate-100 dark:bg-slate-900 py-4 mt-6 p-4 max-w-[93rem] px-4 mx-auto border-2 border-slate-600 rounded-lg">
        <div className="flex text-center mb-4 border-b-2 border-gray-600 pb-2">
          <Image
            src={logo.src}
            alt="logo"
            width={logo.width}
            height={logo.height}
            className="w-20 aspect-square"
          />
          <div className="w-full">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              ST JOSEPH ENGINEERING COLLEGE, VAMANJOOR, MANGALURU - 575028
            </h1>
            <h2 className="text-xl font-semibold mt-2 text-slate-800 dark:text-slate-200">
              PROCESS LEVEL SKILL MATRIX
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Doc. No :{" "}
            </span>
            <span className="text-slate-900 dark:text-slate-100">
              {data[0]?.docNo}
            </span>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Version No :{" "}
            </span>
            <span className="text-slate-900 dark:text-slate-100">
              {data[0]?.version}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 rounded-md">
          <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-center text-slate-900 dark:text-slate-100">
              Prepared By
            </h3>
            <p className="text-sm text-center text-slate-900 dark:text-slate-100">
              {data[0]?.preparedBy}
            </p>
          </div>
          <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-center text-slate-900 dark:text-slate-100">
              Reviewed By
            </h3>
            <p className="text-sm text-center text-slate-900 dark:text-slate-100">
              {data[0]?.reviewedBy}
            </p>
          </div>
          <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-center text-slate-900 dark:text-slate-100">
              Approved By
            </h3>
            <p className="text-sm text-center text-slate-900 dark:text-slate-100">
              {data[0]?.approvedBy}
            </p>
          </div>
        </div>

        <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
          <p className="text-sm mb-2 font-semibold text-slate-900 dark:text-slate-100">
            Last Updated On :{" "}
            <span className="text-slate-900 dark:text-slate-100 font-mono">
              {lastUpdated}
            </span>
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Name of the Department :{" "}
            <span className="text-slate-900 dark:text-slate-100 font-normal">
              {data[0]?.departmentName}
            </span>
          </p>
        </div>

        {/* --- Database --- */}
        <div className="justify-center px-12 py-6">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </motion.div>
  );
}
