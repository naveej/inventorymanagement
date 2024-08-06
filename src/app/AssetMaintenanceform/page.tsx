"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const AssetMaintenanceForm = () => {
  const [docNo, setDocNo] = useState<string>("IAD003");
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
    <div className="w-full h-screen flex justify-center items-center flex-col bg-blue-500/50">
      <h1>Asset Maintenance Form</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] flex flex-col gap-4 mt-8 bg-white/50 p-4"
      >
        <Input
          type="text"
          placeholder="Doc No"
          value={docNo}
          onChange={(e) => setDocNo(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Version No"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Prepared By"
          value={preparedBy}
          onChange={(e) => setPreparedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Reviewed By"
          value={reviewedBy}
          onChange={(e) => setReviewedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Approved By"
          value={approvedBy}
          onChange={(e) => setApprovedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Asset Name"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Asset No"
          value={assetNo}
          onChange={(e) => setAssetNo(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Frequency of Maintenance"
          value={frequencyOfMaintenance}
          onChange={(e) => setFrequencyOfMaintenance(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Type of Asset"
          value={typeOfAsset}
          onChange={(e) => setTypeOfAsset(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Last Done At"
          value={lastDoneAt}
          onChange={(e) => setLastDoneAt(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Reference No"
          value={refNo}
          onChange={(e) => setRefNo(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Next Due On"
          value={nextDueOn}
          onChange={(e) => setNextDueOn(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AssetMaintenanceForm;
