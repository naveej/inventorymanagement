"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

const NCOutputForm = () => {
  const [docNo, setDocNo] = useState<string>("IADO09");
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
  const [nCDetails, setNCDetails] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [actionTaken, setActionTaken] =
    useState<string>("");
  const [responsibility, setResponsibility] = useState<string>("");
  const [ncApprovedBy, setncApprovedBy] = useState<string>('');
  const [targetDate, setTargetDate] = useState<Date>();
  const [status, setStatus] = useState<string>('pending');
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
        date: new Date(),
        nCDetails,
        reason,
        actionTaken,
        responsibility,
        ncApprovedBy,
        targetDate,
        status,
        comments,
    };

    console.log("Client before Send", formData);

    try {
      const result = await axios.post(
        "/api/post/create/ncOutput",
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
        NC Output Form
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
            <label htmlFor="ncDetails" className="text-slate-300 font-semibold">
              NC Details
            </label>
            <Input
              type="text"
              id="ncDetails"
              placeholder="NC Details"
              value={nCDetails}
              onChange={(e) => setNCDetails(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reason" className="text-slate-300 font-semibold">
              Reason
            </label>
            <Input
              type="text"
              id="reason"
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="actionTaken"
              className="text-slate-300 font-semibold"
            >
              Action Taken
            </label>
            <Input
              type="text"
              id="actionTaken"
              placeholder="Action Taken"
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="responsibility"
              className="text-slate-300 font-semibold"
            >
              Responsibility
            </label>
            <Input
              type="text"
              id="responsibility"
              placeholder="Responsibility"
              value={responsibility}
              onChange={(e) => setResponsibility(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="ncApprovedBy"
              className="text-slate-300 font-semibold"
            >
              Approved By
            </label>
            <Input
              type="text"
              id="ncApprovedBy"
              placeholder="Approved By"
              value={ncApprovedBy}
              onChange={(e) => setncApprovedBy(e.target.value)}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="targetDate" className="text-slate-300 font-semibold">
              Target Date
            </label>
            <Input
              type="date"
              id="targetDate"
              placeholder="Target Date"
              value={targetDate ? targetDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setTargetDate(new Date(e.target.value))}
              className="p-2 rounded text-slate-600 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-slate-300 font-semibold">
              Status
            </label>
            <Input
              type="text"
              id="status"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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

export default NCOutputForm;
