"use client";
import { ExtendedColumnDef } from "../../_types/utility.types";
import React, { useState } from "react";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import axios from "axios";
import "../print.css";
import { useRouter } from "next/navigation";

export type NCOutput = {
  _id: string;
  metadata: {
    docNo: string;
    version: string;
    preparedBy: string;
    reviewedBy: string;
    approvedBy: string;
    departmentName: string;
  }; // Adjust this type according to MetadataSchema
  date: string;
  ncDetails: string;
  reason: string;
  actionTaken: string;
  responsibility: string;
  ncApprovedBy: string;
  targetDate: string;
  status: string;
  comments: string;
  lastUpdated: string;
};

async function deleteRow(id: string, fetchData: () => void) {
  try {
    const response = await axios.delete(`/api/post/delete/ncOutput`, {
      data: { id },
    });
    if (response.status === 200) {
      toast.success("Row deleted successfully!");
      fetchData(); // Refresh the table data
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

export const columns = (
  fetchData: () => void
): ExtendedColumnDef<NCOutput, unknown>[] => [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span>{new Date(row.original.date).toLocaleDateString()}</span>
    ),
    className: "date-column",
  },
  {
    accessorKey: "ncDetails",
    header: "NC Details",
    cell: ({ row }) => <span>{row.original.ncDetails}</span>,
    className: "nc-details-column",
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => <span>{row.original.reason}</span>,
    className: "reason-column",
  },
  {
    accessorKey: "actionTaken",
    header: "Action Taken",
    cell: ({ row }) => <span>{row.original.actionTaken}</span>,
    className: "action-taken-column",
  },
  {
    accessorKey: "responsibility",
    header: "Responsibility",
    cell: ({ row }) => <span>{row.original.responsibility}</span>,
    className: "responsibility-column",
  },
  {
    accessorKey: "ncApprovedBy",
    header: "Approved By",
    cell: ({ row }) => <span>{row.original.ncApprovedBy}</span>,
    className: "approved-by-column",
  },
  {
    accessorKey: "targetDate",
    header: "Target Date",
    cell: ({ row }) => (
      <span>{new Date(row.original.targetDate).toLocaleDateString()}</span>
    ),
    className: "target-date-column",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span>{row.original.status}</span>,
    className: "status-column",
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => <span>{row.original.comments}</span>,
    className: "comments-column",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [loading, setLoading] = useState(false);
      const router = useRouter();
      const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
          setLoading(true);
          await deleteRow(id, fetchData);
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
            style={{
              backgroundColor: "Black",
              border: "1px solid #ccc",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                if (row.original._id) {
                  navigator.clipboard.writeText(row.original._id);
                } else {
                  console.error("_id is undefined");
                }
              }}
            >
              Copy Entry ID
            </DropdownMenuItem>
            <DropdownMenuItem
            onClick = {async ()=>{
              if(row.original){
                if (
                  window.confirm("Are you sure you want to update this item?")
                ) {
                  router.push(`/forms/NC-Outputform?data=${encodeURIComponent(JSON.stringify(row.original))}`); 
                }
              }
              else{
                console.log("_id is undefined")
              }
            }}>Update</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                if (row.original._id) {
                  await handleDelete(row.original._id);
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
