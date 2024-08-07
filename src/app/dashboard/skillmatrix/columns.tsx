"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table"; // Adjust the import path as necessary
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Define the shape of the SkillMatrixForm data
export type SkillMatrixForm = {
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
};

// Function to fetch data
async function fetchData(): Promise<SkillMatrixForm[]> {
  const response = await fetch("/api/get/skillMatrix");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export default function Columns() {
  const [columns, setColumns] = useState<ColumnDef<SkillMatrixForm>[]>([]);
  const [data, setData] = useState<SkillMatrixForm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);

        // Determine the maximum number of skills in the fetched data
        const maxSkills = Math.max(
          ...fetchedData.map((item) => item.skills.length)
        );

        // Update the columns array to reflect the fields in the SkillMatrixForm
        const updatedColumns: ColumnDef<SkillMatrixForm>[] = [
          { accessorKey: "name", header: "Name" },
          // Dynamically generate columns for skills based on the maximum number of skills
          // ...Array.from({ length: maxSkills }, (_, i) => ({
          //   accessorKey: `skills[${i}]`,
          //   header: `Skill ${i + 1}`,
          // })),
        ];

        setColumns(updatedColumns);
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
    <div className="justify-center px-9 py-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
