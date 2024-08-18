"use client";

import { ColumnDef } from "@tanstack/react-table";
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

// This type is used to define the shape of our data.
export type Asset = {
  _id: string;
  metadata: {
    docNo: string;
    version: string;
    preparedBy: string;
    reviewedBy: string;
    approvedBy: string;
    departmentName: string;
  }; // Adjust this type according to MetadataSchema
  assetName: string;
  assetNo: string;
  frequencyOfMaintenance: string;
  typeOfAsset: string;
  lastDoneAt: string;
  refNo: string;
  nextDueOn: string;
  comments: string;
  lastUpdated: string;
};

async function deleteRow(id: string, fetchData: () => void) {
  try {
    const response = await axios.delete(`/api/post/delete/assetMaintenance`, {
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

export const columns = (fetchData: () => void): ColumnDef<Asset, unknown>[] => [
  {
    accessorKey: "assetName",
    header: "Asset Name",
    cell: ({ row }) => <span>{row.original.assetName}</span>,
  },
  {
    accessorKey: "assetNo",
    header: "Asset No",
    cell: ({ row }) => <span>{row.original.assetNo}</span>,
  },
  {
    accessorKey: "frequencyOfMaintenance",
    header: "Frequency of Maintenance",
    cell: ({ row }) => <span>{row.original.frequencyOfMaintenance}</span>,
  },
  {
    accessorKey: "typeOfAsset",
    header: "Internal / External",
    cell: ({ row }) => <span>{row.original.typeOfAsset}</span>,
  },
  {
    accessorKey: "lastDoneAt",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Done At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span>{new Date(row.original.lastDoneAt).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "refNo",
    header: "Reference No",
    cell: ({ row }) => <span>{row.original.refNo}</span>,
  },
  {
    accessorKey: "nextDueOn",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Next Due On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span>{new Date(row.original.nextDueOn).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => <span>{row.original.comments}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [loading, setLoading] = useState(false);

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
            <DropdownMenuItem>Update</DropdownMenuItem>
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
