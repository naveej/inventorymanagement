"use client";
import { columns } from "./columns";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import logo from "../../assets/logo.png";

interface NCOutput {
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
}

async function getData(): Promise<NCOutput[]> {
  const response = await fetch("/api/get/forms/ncOutput");
  if (!response.ok) {
    throw new Error("Failed to fetch NC Output");
  }
  return response.json();
}

const DemoPage: React.FC = () => {
  const [data, setData] = useState<NCOutput[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        const formattedData = data.map((item) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString(),
          targetDate: new Date(item.targetDate).toLocaleDateString(),
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
      <div className="text-center text-3xl font-bold py-4 dark:text-white text-black">
        NC Output
      </div>
      {/* --- Header --- */}
      <div className="dark:bg-black py-4 mt-6 p-4 max-w-[93rem] px-4 mx-auto border-2 border-gray-400 rounded-lg">
        <div className="flex text-center mb-4 border-b-2 border-gray-600 pb-2">
          <Image
            src={logo.src}
            alt="logo"
            width={logo.width}
            height={logo.height}
            className="w-20 aspect-square"
          />
          <div className="w-full">
            <h1 className="text-2xl font-bold dark:text-white text-black">
              ST JOSEPH ENGINEERING COLLEGE, VAMANJOOR, MANGALURU - 575028
            </h1>
            <h2 className="text-xl font-semibold mt-2 dark:text-white text-black">
              NC OUTPUT
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 border rounded-md border-gray-600 p-2">
            <span className="text-sm font-semibold text-black dark:text-white">
              Doc. No :{" "}
            </span>
            <span className="text-black dark:text-white">
              {data[0]?.metadata.docNo}
            </span>
          </div>
          <div className="col-span-1 "></div>
          <div className="col-span-1 border border-gray-600 p-2 rounded-md">
            <span className="text-sm font-semibold text-black dark:text-white">
              Version No :{" "}
            </span>
            <span className="text-black dark:text-white">
              {data[0]?.metadata.version}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 rounded-md">
          <div className="border border-gray-600 p-2 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white">
              Prepared By
            </h3>
            <p className="text-sm text-center text-black dark:text-white">
              {data[0]?.metadata.preparedBy}
            </p>
          </div>
          <div className="border border-gray-600 p-2 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white">
              Reviewed By
            </h3>
            <p className="text-sm text-center text-black dark:text-white">
              {data[0]?.metadata.reviewedBy}
            </p>
          </div>
          <div className="border border-gray-600 p-2 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white">
              Approved By
            </h3>
            <p className="text-sm text-center text-black dark:text-white">
              {data[0]?.metadata.approvedBy}
            </p>
          </div>
        </div>

        <div className="border border-gray-600 p-2 rounded-md">
          <p className="text-sm mb-2 font-semibold text-black dark:text-white">
            Last Updated On :{" "}
            <span className="text-black dark:text-white font-mono">
              {lastUpdated}
            </span>
          </p>
          <p className="text-sm font-bold text-black dark:text-white">
            Name of the Department :{" "}
            <span className="text-black dark:text-white font-normal">
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
