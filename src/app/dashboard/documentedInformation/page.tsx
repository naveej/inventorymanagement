"use client";
import { columns } from "./columns";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import { useReactToPrint } from "react-to-print";
import SkeletonLoader from "@/components/customUI/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface DocumentedInformation {
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
}

async function getData(): Promise<DocumentedInformation[]> {
  const response = await fetch("/api/get/forms/documentedInformation");
  if (!response.ok) {
    throw new Error("Failed to fetch Documented Information");
  }
  return response.json();
}

const DemoPage: React.FC = () => {
  const [data, setData] = useState<DocumentedInformation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>();

  const fetchData = async () => {
    try {
      const data = await getData();
      const formattedData = data.map((item) => ({
        ...item,
        effectiveDate: new Date(item.effectiveDate).toLocaleDateString(),
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

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (loading) {
    return <SkeletonLoader />;
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
      <div className="text-center text-3xl font-bold py-2 dark:text-white text-black">
        Documented Information
      </div>
      <div ref={componentRef}>
        {/* --- Header --- */}
        <div className="bg-slate-100 dark:bg-slate-900 py-2 mt-4 p-4 max-w-[93rem] px-4 mx-auto border-2 border-slate-600 rounded-lg print-section">
          <div className="flex text-center mb-4 border-b-2 border-gray-600 pb-2 print-header">
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
                List of Documented Information
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
          <div className="justify-center py-6 print-section">
            <div className="print-table">
              <DataTable columns={columns(fetchData)} data={data} />
            </div>
          </div>
        </div>
      </div>
      {/* --- Print Button --- */}
      <div className="max-w-[93rem] mx-auto mt-4 flex justify-end">
        <Button
          onClick={handlePrint}
          variant="secondary"
          className="rounded-lg"
        >
          <Printer color="#f1f5f9" className="mr-2 h-5 w-5" />
          Print PDF
        </Button>
      </div>
    </motion.div>
  );
};

export default DemoPage;
