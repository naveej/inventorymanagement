"use client";
import { columns } from "./columns";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import logo from "../../assets/logo.png";

interface CalibrationSchedule {
  metadata: {
    docNo: string;
    version: string;
    preparedBy: string;
    reviewedBy: string;
    approvedBy: string;
    departmentName: string;
  }; // Adjust this type according to MetadataSchema
  instrumentName: string;
  instrumentNo: string;
  frequencyOfCalibration: string;
  typeOfInstrument: string;
  lastDoneAt: string;
  refNo: string;
  nextDueOn: string;
  comments: string;
  lastUpdated: string;
}

async function getData(): Promise<CalibrationSchedule[]> {
  const response = await fetch("/api/get/forms/caliberation_Schedule");
  if (!response.ok) {
    throw new Error("Failed to fetch calibration schedule data");
  }
  return response.json();
}

const DemoPage: React.FC = () => {
  const [data, setData] = useState<CalibrationSchedule[]>([]);
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
      <div className="text-center text-3xl font-bold py-4 text-slate-200">
        Calibration Schedule
      </div>
      {/* --- Header --- */}
      <div className="bg-black mt-6 text-white p-4 max-w-[100rem] px-4 mx-auto border-2 border-gray-600 rounded-md">
        <div className="flex text-center mb-4 border-b-2 border-gray-600 pb-2">
          <Image
            src={logo.src}
            alt="logo"
            width={logo.width}
            height={logo.height}
            className="w-20 aspect-square"
          />
          <div className="w-full">
            <h1 className="text-2xl font-bold text-slate-300">
              ST JOSEPH ENGINEERING COLLEGE, VAMANJOOR, MANGALURU - 575028
            </h1>
            <h2 className="text-xl font-semibold mt-2 text-slate-300">
              PROCESS LEVEL SKILL MATRIX
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 border border-gray-600 p-2">
            <span className="text-sm font-semibold text-gray-200">
              Doc. No :{" "}
            </span>
            <span className="text-white">{data[0]?.metadata.docNo}</span>
          </div>
          <div className="col-span-1 rounded-md"></div>
          <div className="col-span-1 border border-gray-600 p-2">
            <span className="text-sm font-semibold text-gray-200">
              Version No :{" "}
            </span>
            <span className="text-white">{data[0]?.metadata.version}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 rounded-md">
          <div className="border border-gray-600 p-2">
            <h3 className="text-lg font-semibold mb-2 text-center text-gray-200">
              Prepared By
            </h3>
            <p className="text-sm text-center">
              {data[0]?.metadata.preparedBy}
            </p>
          </div>
          <div className="border border-gray-600 p-2">
            <h3 className="text-lg font-semibold mb-2 text-center text-gray-200">
              Reviewed By
            </h3>
            <p className="text-sm text-center">
              {data[0]?.metadata.reviewedBy}
            </p>
          </div>
          <div className="border border-gray-600 p-2">
            <h3 className="text-lg font-semibold mb-2 text-center text-gray-200">
              Approved By
            </h3>
            <p className="text-sm text-center">
              {data[0]?.metadata.approvedBy}
            </p>
          </div>
        </div>

        <div className="border border-gray-600 p-2">
          <p className="text-sm mb-2 font-semibold text-gray-200">
            Last Updated On : <span className="text-white">{lastUpdated}</span>
          </p>
          <p className="text-sm font-medium text-gray-200">
            Name of the Department :{" "}
            <span className="text-white">
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
