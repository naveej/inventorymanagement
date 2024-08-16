"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
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

export const columns: ColumnDef<NCOutput, unknown>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
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
  },
  {
    accessorKey: "ncDetails",
    header: "NC Details",
    cell: ({ row }) => <span>{row.original.ncDetails}</span>,
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => <span>{row.original.reason}</span>,
  },
  {
    accessorKey: "actionTaken",
    header: "Action Taken",
    cell: ({ row }) => <span>{row.original.actionTaken}</span>,
  },
  {
    accessorKey: "responsibility",
    header: "Responsibility",
    cell: ({ row }) => <span>{row.original.responsibility}</span>,
  },
  {
    accessorKey: "ncApprovedBy",
    header: "Approved By",
    cell: ({ row }) => <span>{row.original.ncApprovedBy}</span>,
  },
  {
    accessorKey: "targetDate",
    header: "Target Date",
    cell: ({ row }) => (
      <span>{new Date(row.original.targetDate).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span>{row.original.status}</span>,
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => <span>{row.original.comments}</span>,
  },
  {
    id: "actions",
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
