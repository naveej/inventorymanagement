"use client";
import { columns } from "./columns";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

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
        NC Output
      </div>
      {/* --- Header --- */}
      <div className="bg-slate-100 dark:bg-slate-900 py-4 mt-6 p-4 max-w-[93rem] px-4 mx-auto border-2 border-slate-600 rounded-lg">
        <div className="flex text-center mb-4 border-b-2 border-slate-600 pb-2">
          <Image
            src={logo.src}
            alt="logo"
            width={logo.width}
            height={logo.height}
            className="w-20 aspect-square"
          />
          <div className="w-full">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              ST JOSEPH ENGINEERING COLLEGE, VAMANJOOR, MANGALURU - 575028
            </h1>
            <h2 className="text-xl font-semibold mt-2 text-slate-800 dark:text-slate-200">
              NC OUTPUT
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
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </motion.div>
  );
};

export default DemoPage;
