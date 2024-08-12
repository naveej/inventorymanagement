"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

const AssetMaintenanceForm = () => {
  const [docNo, setDocNo] = useState<string>("IAD009");
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (
      !departmentName ||
      !assetName ||
      !assetNo ||
      !frequencyOfMaintenance ||
      !typeOfAsset ||
      !lastDoneAt ||
      !refNo ||
      !nextDueOn ||
      !comments
    ) {
      setError("Please fill out all required fields.");
      return;
    }
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
    setLoading(true);
    try {
      const result = await axios.post(
        "/api/post/create/assetMaintenance",
        formData
      );
      console.log("Result", result);
      setError(null); // Clear any previous errors
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error message:", error.message);
        console.error("Axios error response:", error.response);
        setError(error.response?.data?.error || "An error occurred");
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex p-4 justify-center items-center flex-col dark:text-white text-black">
      <div className="text-3xl font-bold dark:text-white text-black">
        Asset Maintenance Form
      </div>

      <form
        onSubmit={handleSubmit}
        className="min-w-[500px] px-4 py-4 flex flex-col gap-4 mt-8 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/** Form Fields */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="docNo"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Doc No
            </label>
            <Input
              type="text"
              id="docNo"
              placeholder="Doc No"
              value={docNo}
              onChange={(e) => setDocNo(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="version"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Version No
            </label>
            <Input
              type="text"
              id="version"
              placeholder="Version No"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="preparedBy"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Prepared By
            </label>
            <Input
              type="text"
              id="preparedBy"
              placeholder="Prepared By"
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="reviewedBy"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Reviewed By
            </label>
            <Input
              type="text"
              id="reviewedBy"
              placeholder="Reviewed By"
              value={reviewedBy}
              onChange={(e) => setReviewedBy(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="approvedBy"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Approved By
            </label>
            <Input
              type="text"
              id="approvedBy"
              placeholder="Approved By"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="departmentName"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Department Name
            </label>
            <Input
              type="text"
              id="departmentName"
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="assetName"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Asset Name
            </label>
            <Input
              type="text"
              id="assetName"
              placeholder="Asset Name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="assetNo"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Asset No
            </label>
            <Input
              type="text"
              id="assetNo"
              placeholder="Asset No"
              value={assetNo}
              onChange={(e) => setAssetNo(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="frequencyOfMaintenance"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Frequency of Maintenance
            </label>
            <Input
              type="text"
              id="frequencyOfMaintenance"
              placeholder="Frequency of Maintenance"
              value={frequencyOfMaintenance}
              onChange={(e) => setFrequencyOfMaintenance(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="typeOfAsset"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Type of Asset
            </label>
            <Input
              type="text"
              id="typeOfAsset"
              placeholder="Type of Asset"
              value={typeOfAsset}
              onChange={(e) => setTypeOfAsset(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastDoneAt"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Last Done At
            </label>
            <Input
              type="date"
              id="lastDoneAt"
              placeholder="Last Done At"
              value={lastDoneAt?.toString()}
              onChange={(e) => setLastDoneAt(e.target.valueAsDate || undefined)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="refNo"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Reference No
            </label>
            <Input
              type="text"
              id="refNo"
              placeholder="Reference No"
              value={refNo}
              onChange={(e) => setRefNo(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="nextDueOn"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Next Due On
            </label>
            <Input
              type="date"
              id="nextDueOn"
              placeholder="Next Due On"
              value={nextDueOn?.toString()}
              onChange={(e) => setNextDueOn(e.target.valueAsDate || undefined)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>

          <div className="flex flex-col gap-2 col-span-full">
            <label
              htmlFor="comments"
              className="dark:text-slate-300 text-slate-700 font-semibold"
            >
              Comments
            </label>
            <Input
              type="text"
              id="comments"
              placeholder="Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="p-2 rounded dark:bg-slate-700 dark:text-white text-slate-600 border-gray-300 dark:border-slate-600"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center mt-4 font-semibold">
            {error}
          </div>
        )}

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            disabled={loading}
            className="p-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition-all"
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>

      <Link
        href="/"
        className="mt-4 text-blue-500 dark:text-blue-300 hover:underline"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default AssetMaintenanceForm;
