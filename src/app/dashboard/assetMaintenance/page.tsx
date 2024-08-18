"use client";
import { columns } from "./columns";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

interface Asset {
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

  const fetchData = async () => {
    try {
      const data = await getData();
      const formattedData = data.map((item) => ({
        ...item,
        lastDoneAt: new Date(item.lastDoneAt).toLocaleDateString(),
        nextDueOn: new Date(item.nextDueOn).toLocaleDateString(),
        lastUpdated: new Date(item.lastUpdated).toLocaleDateString(),
      }));
      // Find the latest lastUpdated date
      const latestLastUpdated = formattedData.reduce((latest, item) => {
        const itemDate = new Date(item.lastUpdated);
        return itemDate > new Date(latest) ? item.lastUpdated : latest;
      }, formattedData[0]?.lastUpdated || "");

      setData(formattedData);
      setLastUpdated(latestLastUpdated);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="animate-pulse bg-gray-700 px-2 rounded-md py-5 w-1/2 justify-center mx-auto"></div>
        {/* --- Header --- */}
        <div className="bg-slate-100 dark:bg-slate-900 py-4 mt-6 p-4 max-w-[93rem] px-4 mx-auto border-2 border-slate-600 rounded-lg">
          <div className="flex text-center mb-4 border-b-2 border-gray-600 pb-2">
            <div className="w-20 aspect-square bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-1/2 mx-auto justify-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 rounded-md">
            <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          </div>

          {/* --- Database --- */}
          <div className="justify-center px-12 py-6">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.2,
      }}
    >
      <div className="text-center text-3xl font-bold py-4 dark:text-white text-black">
        Asset Maintenance
      </div>
      {/* --- Header --- */}
      <div className="bg-slate-100 dark:bg-slate-900 py-4 mt-6 p-4 max-w-[93rem] px-4 mx-auto border-2 border-slate-600 rounded-lg">
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
              Maintenance Plan
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Doc. No :{" "}
            </span>
            <span className="text-slate-900 dark:text-slate-100">
              {data[0]?.metadata.docNo}
            </span>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Version No :{" "}
            </span>
            <span className="text-slate-900 dark:text-slate-100">
              {data[0]?.metadata.version}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 rounded-md">
          <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-center text-slate-900 dark:text-slate-100">
              Prepared By
            </h3>
            <p className="text-sm text-center text-slate-900 dark:text-slate-100">
              {data[0]?.metadata.preparedBy}
            </p>
          </div>
          <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-center text-slate-900 dark:text-slate-100">
              Reviewed By
            </h3>
            <p className="text-sm text-center text-slate-900 dark:text-slate-100">
              {data[0]?.metadata.reviewedBy}
            </p>
          </div>
          <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-center text-slate-900 dark:text-slate-100">
              Approved By
            </h3>
            <p className="text-sm text-center text-slate-900 dark:text-slate-100">
              {data[0]?.metadata.approvedBy}
            </p>
          </div>
        </div>

        <div className="border border-slate-600 p-2 rounded-md dark:bg-slate-800 dark:border-slate-700">
          <p className="text-sm mb-2 font-semibold text-slate-900 dark:text-slate-100">
            Last Updated On :{" "}
            <span className="text-slate-900 dark:text-slate-100 font-mono">
              {lastUpdated}
            </span>
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Name of the Department :{" "}
            <span className="text-slate-900 dark:text-slate-100 font-normal">
              {data[0]?.metadata.departmentName}
            </span>
          </p>
        </div>

        {/* --- Database --- */}
        <div className="justify-center px-12 py-6">
          <DataTable columns={columns(fetchData)} data={data} />
        </div>
      </div>
    </motion.div>
  );
};

export default DemoPage;
