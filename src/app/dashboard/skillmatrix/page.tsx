"use client";
//import { SkillMatrixForm } from "./columns";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExtendedColumnDef } from "@/app/_types/utility.types";

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

export default function DemoPage() {
  const [data, setData] = useState<SkillMatrixForm[]>([]);
  const [columns, setColumns] = useState<ExtendedColumnDef<SkillMatrixForm>[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log("DATA: 🔥🔥", data);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        console.log("RESULT:", result);

        const updatedResult = result.map((item) => {
          const updatedSkill = item.skills.map((skill, index) => ({
            [`skill${index}`]: skill,
          }));

          return {
            ...item,
            ...updatedSkill.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
          };
        });

        setData(updatedResult);

        // Determine the maximum number of skills in the fetched data
        const maxSkills = Math.max(...result.map((item) => item.skills.length));

        const updatedColumns: ExtendedColumnDef<SkillMatrixForm>[] = [
          { accessorKey: "name", header: "Name" },
          // Dynamically generate columns for skills based on the maximum number of skills
          ...updatedResult.map((item, i) => ({
            accessorKey: `skill${i}`,
            header: `Skill ${i + 1}`,
          })),
          {
            id: "actions",
            className: "text-right",
            cell: ({ row }) => {
              const data = row.original;
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
                    style={{
                      backgroundColor: "Black",
                      border: "1px solid #ccc",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
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
                    <DropdownMenuItem>Update</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            },
          },
        ];

        // const updatedColumnData: SkillMatrixForm[] = result.map((row) => {
        //   const spreadSkills = row.skills.reduce(
        //     (acc: { [key: string]: string }, skill: string, index: number) => {
        //       acc[`skill-${index + 1}`] = skill;
        //       return acc;
        //     },
        //     {}
        //   );

        //   return {
        //     docNo: row.docNo,
        //     version: row.version,
        //     preparedBy: row.preparedBy,
        //     reviewedBy: row.reviewedBy,
        //     approvedBy: row.approvedBy,
        //     departmentName: row.departmentName,
        //     name: row.name,
        //     ...spreadSkills,
        //     lastUpdated: new Date(row.lastUpdated).toLocaleDateString(),
        //   };
        // });

        setColumns(updatedColumns);
        // setData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="text-center text-3xl font-bold py-4 text-slate-200">
        Skill Matrix
      </div>
      {/* --- Header --- */}
      <div className="bg-black mt-6 text-white p-4 max-w-[100rem] px-4 mx-auto border-2 border-gray-600 rounded-md">
        <div className="flex text-center mb-4 border-b-2 border-gray-600 pb-2">
          <Image
            src={logo.src}
            alt="logo"
            width={logo.width}
            height={logo.height}
            className="w-20 aspect-square"
          />
          <div className="w-full">
            <h1 className="text-2xl font-bold text-slate-300">
              ST JOSEPH ENGINEERING COLLEGE, VAMANJOOR, MANGALURU - 575028
            </h1>
            <h2 className="text-xl font-semibold mt-2 text-slate-300">
              PROCESS LEVEL SKILL MATRIX
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 border border-gray-600 p-2">
            <span className="text-sm font-semibold text-gray-200">
              Doc. No :{" "}
            </span>
            <span className="text-white">{data[0]?.docNo}</span>
          </div>
          <div className="col-span-1 rounded-md"></div>
          <div className="col-span-1 border border-gray-600 p-2">
            <span className="text-sm font-semibold text-gray-200">
              Version No :{" "}
            </span>
            <span className="text-white">{data[0]?.version}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 rounded-md">
          <div className="border border-gray-600 p-2">
            <h3 className="text-lg font-semibold mb-2 text-center text-gray-200">
              Prepared By
            </h3>
            <p className="text-sm text-center">{data[0]?.reviewedBy}</p>
          </div>
          <div className="border border-gray-600 p-2">
            <h3 className="text-lg font-semibold mb-2 text-center text-gray-200">
              Reviewed By
            </h3>
            <p className="text-sm text-center">{data[0]?.reviewedBy}</p>
          </div>
          <div className="border border-gray-600 p-2">
            <h3 className="text-lg font-semibold mb-2 text-center text-gray-200">
              Approved By
            </h3>
            <p className="text-sm text-center">{data[0]?.approvedBy}</p>
          </div>
        </div>

        <div className="border border-gray-600 p-2">
          <p className="text-sm mb-2 font-semibold text-gray-200">
            Last Updated On :{" "}
            <span className="text-white">{data[0]?.lastUpdated}</span>
          </p>
          <p className="text-sm font-medium text-gray-200">
            Name of the Department :{" "}
            <span className="text-white">{data[0]?.departmentName}</span>
          </p>
        </div>
        <div className="border border-gray-600 p-2">
          <span className="flex flex-grow text-gray-200 text-sm font-semibold gap-12">
            {" "}
            All skill set required for the area handled to be :{" "}
            <span className="flex flex-grow font-normal text-white">
              Rating Rationale: 1 - beginner, 2 - needs improvement, 3 - can
              handle independently, 4 - can train others
            </span>
          </span>
        </div>
      </div>
      {/* --- Database --- */}
      <div className="justify-center px-12 py-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
