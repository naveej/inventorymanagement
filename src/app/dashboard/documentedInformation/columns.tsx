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
export type DocumentedInformation = {
  _id: string;
  metadata: {
    docNo: string;
    version: string;
    preparedBy: string;
    reviewedBy: string;
    approvedBy: string;
    departmentName: string;
  };
  documentTitle: string;
  refNo: string;
  versionNo: string;
  area: string;
  typeOfDocument: string;
  effectiveDate: string;
  responsibility: string;
  mediumOfStorage: string;
  placeOfStorage: string;
  retentionPeriod: string;
  lastUpdated: string;
};

async function deleteRow(id: string) {
  try {
    const response = await axios.delete(
      `/api/post/delete/documentedInformation`,
      {
        data: { id },
      }
    );
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

export const columns: ColumnDef<DocumentedInformation, unknown>[] = [
  {
    accessorKey: "documentTitle",
    header: "Document Title",
    cell: ({ row }) => <span>{row.original.documentTitle}</span>,
  },
  {
    accessorKey: "refNo",
    header: "Reference Number",
    cell: ({ row }) => <span>{row.original.refNo}</span>,
  },
  {
    accessorKey: "versionNo",
    header: "Version Number",
    cell: ({ row }) => <span>{row.original.versionNo}</span>,
  },
  {
    accessorKey: "area",
    header: "Internal/External",
    cell: ({ row }) => <span>{row.original.area}</span>,
  },
  {
    accessorKey: "typeOfDocument",
    header: "Document/Record",
    cell: ({ row }) => <span>{row.original.typeOfDocument}</span>,
  },
  {
    accessorKey: "effectiveDate",
    header: "Effective Date",
    cell: ({ row }) => (
      <span>{new Date(row.original.effectiveDate).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "responsibility",
    header: "Responsibility",
    cell: ({ row }) => <span>{row.original.responsibility}</span>,
  },
  {
    accessorKey: "mediumOfStorage",
    header: "Medium of Storage",
    cell: ({ row }) => <span>{row.original.mediumOfStorage}</span>,
  },
  {
    accessorKey: "placeOfStorage",
    header: "Place of Storage",
    cell: ({ row }) => <span>{row.original.placeOfStorage}</span>,
  },
  {
    accessorKey: "retentionPeriod",
    header: "Retention Period",
    cell: ({ row }) => <span>{row.original.retentionPeriod}</span>,
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
