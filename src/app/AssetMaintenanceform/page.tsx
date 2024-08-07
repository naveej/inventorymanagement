"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

const AssetMaintenanceForm = () => {
  const [docNo, setDocNo] = useState<string>("IADO1O");
  const [version, setVersion] = useState<string>("01");
  const [preparedBy, setPreparedBy] = useState<string>(
    "Dr Pavana Kumara B - Head-IQAC"
  );
  const [reviewedBy, setReviewedBy] = useState<string>(
    "Dr Prakash Pinto - Dean MBA"
  );
  const [approvedBy, setApprovedBy] = useState<string>(
    "Dr Rio D'Souza - Principal"
  );
  const [departmentName, setDepartmentName] = useState<string>("");
  const [assetName, setAssetName] = useState<string>("");
  const [assetNo, setAssetNo] = useState<string>("");
  const [frequencyOfMaintenance, setFrequencyOfMaintenance] =
    useState<string>("");
  const [typeOfAsset, setTypeOfAsset] = useState<string>("");
  const [lastDoneAt, setLastDoneAt] = useState<Date>();
  const [refNo, setRefNo] = useState<string>("");
  const [nextDueOn, setNextDueOn] = useState<Date>();
  const [comments, setComments] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const metadata = {
      docNo,
      version,
      preparedBy,
      reviewedBy,
      approvedBy,
      departmentName,
    };

    const formData = {
      metadata,
      assetName,
      assetNo,
      frequencyOfMaintenance,
      typeOfAsset,
      lastDoneAt,
      refNo,
      nextDueOn,
      comments,
    };

    console.log("Client before Send", formData);

    try {
      const result = await axios.post(
        "/api/post/create/assetMaintenance",
        formData
      );
      console.log("Result", result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error message:", error.message);
        console.error("Axios error response:", error.response);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="w-full h-full text-white flex p-4 justify-center items-center flex-col bg-gray-900">
      <div className="text-6xl font-bold text-gray-300">
        Asset Maintenance Form
      </div>

      <form
        onSubmit={handleSubmit}
        className="min-w-[500px] px-4 py-4 flex flex-col gap-4 mt-8 bg-gray-800 p-4 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="docNo" className="text-slate-300 font-semibold">
              Doc No
            </label>
            <Input
              type="text"
              id="docNo"
              placeholder="Doc No"
              value={docNo}
              onChange={(e) => setDocNo(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="version" className="text-slate-300 font-semibold">
              Version No
            </label>
            <Input
              type="text"
              id="version"
              placeholder="Version No"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="p-2 text-slate-600 rounded border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="preparedBy"
              className="text-slate-300 font-semibold"
            >
              Prepared By
            </label>
            <Input
              type="text"
              id="preparedBy"
              placeholder="Prepared By"
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
              className="p-2 text-slate-600 rounded border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="reviewedBy"
              className="text-slate-300 font-semibold"
            >
              Reviewed By
            </label>
            <Input
              type="text"
              id="reviewedBy"
              placeholder="Reviewed By"
              value={reviewedBy}
              onChange={(e) => setReviewedBy(e.target.value)}
              className="p-2 text-slate-600 rounded border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="approvedBy"
              className="text-slate-300 font-semibold"
            >
              Approved By
            </label>
            <Input
              type="text"
              id="approvedBy"
              placeholder="Approved By"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="departmentName"
              className="text-slate-300 font-semibold"
            >
              Department Name
            </label>
            <Input
              type="text"
              id="departmentName"
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="assetName" className="text-slate-300 font-semibold">
              Asset Name
            </label>
            <Input
              type="text"
              id="assetName"
              placeholder="Asset Name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="assetNo" className="text-slate-300 font-semibold">
              Asset No
            </label>
            <Input
              type="text"
              id="assetNo"
              placeholder="Asset No"
              value={assetNo}
              onChange={(e) => setAssetNo(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="frequencyOfMaintenance"
              className="text-slate-300 font-semibold"
            >
              Frequency of Maintenance
            </label>
            <Input
              type="text"
              id="frequencyOfMaintenance"
              placeholder="Frequency of Maintenance"
              value={frequencyOfMaintenance}
              onChange={(e) => setFrequencyOfMaintenance(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="typeOfAsset"
              className="text-slate-300 font-semibold"
            >
              Type of Asset (Internal/External)
            </label>
            <Input
              type="text"
              id="typeOfAsset"
              placeholder="Type of Asset (Internal/External)"
              value={typeOfAsset}
              onChange={(e) => setTypeOfAsset(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastDoneAt"
              className="text-slate-300 font-semibold"
            >
              Last Done At
            </label>
            <Input
              type="date"
              id="lastDoneAt"
              placeholder="Last Done At"
              value={lastDoneAt ? lastDoneAt.toISOString().split("T")[0] : ""}
              onChange={(e) => setLastDoneAt(new Date(e.target.value))}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="refNo" className="text-slate-300 font-semibold">
              Reference No
            </label>
            <Input
              type="text"
              id="refNo"
              placeholder="Reference No"
              value={refNo}
              onChange={(e) => setRefNo(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nextDueOn" className="text-slate-300 font-semibold">
              Next Due On
            </label>
            <Input
              type="date"
              id="nextDueOn"
              placeholder="Next Due On"
              value={nextDueOn ? nextDueOn.toISOString().split("T")[0] : ""}
              onChange={(e) => setNextDueOn(new Date(e.target.value))}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2 col-span-full">
            <label htmlFor="comments" className="text-slate-300 font-semibold">
              Comments
            </label>
            <Input
              type="text"
              id="comments"
              placeholder="Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>
        </div>

        <Button
          className="border-2 text-white/70 bg-gray-900/70 w-1/2 mx-auto justify-center hover:bg-gray-700 transition duration-300 ease-in-out mt-4"
          type="submit"
        >
          Submit
        </Button>
      </form>

      <div className="mt-4">
        <Link href="/" className="text-white underline">
          Home
        </Link>
      </div>
    </div>
  );
};

export default AssetMaintenanceForm;
