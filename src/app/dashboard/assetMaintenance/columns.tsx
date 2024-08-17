"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
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

async function deleteRow(id: string) {
  try {
    const response = await axios.delete(`/api/post/delete/assetMaintenance`, {
      data: { id },
    });
    if (response.status === 200) {
      toast.success("Row deleted successfully!");
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

export const columns: ColumnDef<Asset, unknown>[] = [
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
    header: "Last Done At",
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
    header: "Next Due On",
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
      const [data, setData] = useState(row.original);
      const [loading, setLoading] = useState(false);

      const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
          setLoading(true);
          await deleteRow(id);
          // Refresh the table data here if necessary
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
