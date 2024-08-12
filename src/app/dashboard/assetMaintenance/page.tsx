"use client";
import { columns } from "./columns";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import logo from "../../assets/logo.png";

interface Asset {
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
}

async function getData(): Promise<Asset[]> {
  const response = await fetch("/api/get/forms/assetMaintenance");
  if (!response.ok) {
    throw new Error("Failed to fetch asset management data");
  }
  return response.json();
}

const DemoPage: React.FC = () => {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        const formattedData = data.map((item) => ({
          ...item,
          lastDoneAt: new Date(item.lastDoneAt).toLocaleDateString(),
          nextDueOn: new Date(item.nextDueOn).toLocaleDateString(),
          lastUpdated: new Date(item.lastUpdated).toLocaleDateString(),
        }));
        setData(formattedData);
        setLastUpdated(formattedData[0]?.lastUpdated);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="text-center text-3xl font-bold py-4 text-black">
        Asset Maintenance
      </div>
      {/* --- Header --- */}
      <div className="bg-slate-200 dark:bg-slate-800 py-4 mt-6 text-slate-800 dark:text-white p-4 max-w-[93rem] px-4 mx-auto border-2 border-gray-600 rounded-lg">
        <div className="flex text-center mb-4 border-b-2 border-gray-600 pb-2">
          <Image
            src={logo.src}
            alt="logo"
            width={logo.width}
            height={logo.height}
            className="w-20 aspect-square"
          />
          <div className="w-full">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-200">
              ST JOSEPH ENGINEERING COLLEGE, VAMANJOOR, MANGALURU - 575028
            </h1>
            <h2 className="text-xl font-semibold mt-2 text-slate-800 dark:text-gray-300">
              PROCESS LEVEL SKILL MATRIX
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 border rounded-md border-gray-600 p-2 bg-slate-300 dark:bg-slate-900">
            <span className="text-sm font-semibold text-slate-800 dark:text-gray-200">
              Doc. No :{" "}
            </span>
            <span className="text-slate-800 dark:text-gray-200">
              {data[0]?.metadata.docNo}
            </span>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 border border-gray-600 p-2 rounded-md bg-slate-300 dark:bg-slate-900">
            <span className="text-sm font-semibold text-slate-800 dark:text-gray-200">
              Version No :{" "}
            </span>
            <span className="text-slate-800 dark:text-gray-200">
              {data[0]?.metadata.version}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 rounded-md">
          <div className="border border-gray-600 p-2 rounded-md bg-slate-300 dark:bg-slate-900">
            <h3 className="text-lg font-semibold mb-2 text-center text-slate-800 dark:text-gray-300">
              Prepared By
            </h3>
            <p className="text-sm text-center text-slate-800 dark:text-gray-400">
              {data[0]?.metadata.preparedBy}
            </p>
          </div>
          <div className="border border-gray-600 p-2 rounded-md bg-slate-300 dark:bg-slate-900">
            <h3 className="text-lg font-semibold mb-2 text-center text-slate-800 dark:text-gray-300">
              Reviewed By
            </h3>
            <p className="text-sm text-center text-slate-800 dark:text-gray-400">
              {data[0]?.metadata.reviewedBy}
            </p>
          </div>
          <div className="border border-gray-600 p-2 rounded-md bg-slate-300 dark:bg-slate-900">
            <h3 className="text-lg font-semibold mb-2 text-center text-slate-800 dark:text-gray-300">
              Approved By
            </h3>
            <p className="text-sm text-center text-slate-800 dark:text-gray-400">
              {data[0]?.metadata.approvedBy}
            </p>
          </div>
        </div>

        <div className="border border-gray-600 p-2 rounded-md bg-slate-300 dark:bg-slate-900">
          <p className="text-sm mb-2 font-semibold text-slate-800 dark:text-gray-200">
            Last Updated On :{" "}
            <span className="text-slate-800 dark:text-gray-200 font-mono">
              {lastUpdated}
            </span>
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-gray-300">
            Name of the Department :{" "}
            <span className="text-slate-800 dark:text-gray-300 font-normal">
              {data[0]?.metadata.departmentName}
            </span>
          </p>
        </div>
      </div>

      {/* --- Database --- */}
      <div className="justify-center px-12 py-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default DemoPage;
