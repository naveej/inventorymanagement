"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";

// This type is used to define the shape of our data.
export type Asset = {
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
  lastDoneAt: Date;
  refNo: string;
  nextDueOn: Date;
  comments: string;
  lastUpdated: Date;
};

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
    header: "Type of Asset",
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
];
